import express from "express";
import { Activity } from "../models/activityModel.js";
import authenticateUser from "../middleware/authMiddleware.js"; 

const router = express.Router();

router.post("/", authenticateUser, async (req, res) => {
  try {
    const { date, time, activity, duration, difficulty } = req.body;

    if (!date || !time || !activity || !duration || !difficulty) {
      return res.status(400).send({
        message:
          "Please provide all required fields: date, time, activity, duration, difficulty",
      });
    }

    const userId = req.user._id;

    const newActivity = {
      user: userId,
      date,
      time,
      activity,
      duration,
      difficulty,
    };

    const activityRecord = await Activity.create(newActivity);

    return res.status(201).send(activityRecord);
  } catch (error) {
    console.error(error.message);
    res.status(500).send({ message: error.message });
  }
});

router.get("/", authenticateUser, async (req, res) => {
  try {
    const userId = req.user._id; 
    const activities = await Activity.find({ user: userId }); 
    res.json({ data: activities });
  } catch (error) {
    res.status(500).json({ error: "Server Error" });
  }
});


router.get("/:id", authenticateUser, async (req, res) => {
  try {
    const { id } = req.params;
    const activity = await Activity.findById(id);

    if (!activity || activity.user.toString() !== req.user._id.toString()) {
      return res.status(404).json({ message: "Activity not found" });
    }

    return res.status(200).json(activity);
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
});

router.put("/:id", authenticateUser, async (req, res) => {
  try {
    const { date, time, activity, duration, difficulty } = req.body;

    if (!date || !time || !activity || !duration || !difficulty) {
      return res.status(400).send({
        message:
          "Please provide all required fields: date, time, activity, duration, difficulty",
      });
    }

    const { id } = req.params;
    const result = await Activity.findById(id);

    if (!result || result.user.toString() !== req.user._id.toString()) {
      return res.status(404).json({ message: "Activity not found!" });
    }

    const updatedActivity = await Activity.findByIdAndUpdate(
      id,
      { date, time, activity, duration, difficulty },
      { new: true }
    );

    return res
      .status(200)
      .send({ message: "Activity updated successfully", data: updatedActivity });
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
});

router.delete("/:id", authenticateUser, async (req, res) => {
  try {
    const { id } = req.params;
    const activity = await Activity.findById(id);

    if (!activity || activity.user.toString() !== req.user._id.toString()) {
      return res.status(404).json({ message: "Activity not found!" });
    }

    await Activity.findByIdAndDelete(id);

    return res
      .status(200)
      .json({ message: "Activity deleted successfully!" });
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
});

export default router;
