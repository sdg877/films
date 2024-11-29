import express from "express";
import authenticateUser from "../middleware/authMiddleware.js";
import {
  createActivity,
  getActivities,
  getActivityById,
  updateActivity,
  deleteActivity,
  getAllActivities
} from "../controllers/activity.js";

const router = express.Router();

router.post("/", authenticateUser, createActivity);
router.get("/", authenticateUser, getActivities);
router.get("/all", authenticateUser, getAllActivities);
router.get("/:id", authenticateUser, getActivityById);
router.put("/:id", authenticateUser, updateActivity);
router.delete("/:id", authenticateUser, deleteActivity);

export default router;
