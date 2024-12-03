import express from "express";
import authenticateUser from "../middleware/authenticateUser.js";
import {
  createActivity,
  getActivities,
  getActivityById,
  updateActivity,
  deleteActivity,
  getAllActivities,
  getActivitiesByUserId,
  getSimilarActivities
} from "../controllers/activity.js";

const router = express.Router();

router.post("/", authenticateUser, createActivity);
router.get("/", authenticateUser, getActivities);
router.get("/similar", authenticateUser, getSimilarActivities);
router.get("/all", authenticateUser, getAllActivities);
router.get("/user/:userId", authenticateUser, getActivitiesByUserId)
router.get("/:id", authenticateUser, getActivityById);
router.put("/:id", authenticateUser, updateActivity);
router.delete("/:id", authenticateUser, deleteActivity);

export default router;
