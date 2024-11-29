import { Activity } from "../models/activityModel.js";

export const createActivity = async (req, res) => {
  try {
    const { date, time, activity, duration, difficulty } = req.body;

    if (!date || !time || !activity || !duration || !difficulty) {
      return res.status(400).json({
        message:
          "All fields are required: date, time, activity, duration, difficulty",
      });
    }

    const userId = req.user._id;

    const newActivity = new Activity({
      user: userId,
      date,
      time,
      activity,
      duration,
      difficulty,
    });

    const savedActivity = await newActivity.save();

    return res.status(201).json(savedActivity);
  } catch (error) {
    console.error("Error creating activity:", error.message);
    return res
      .status(500)
      .json({ message: "Server error. Please try again later." });
  }
};

export const getActivities = async (req, res) => {
  try {
    const userId = req.user._id;
    const activities = await Activity.find({ user: userId }) || [];
    return res.status(200).json({ data: activities });
  } catch (error) {
    console.error("Error fetching activities:", error.message);
    return res
      .status(500)
      .json({ message: "Server error. Please try again later." });
  }
};


export const getActivityById = async (req, res) => {
  try {
    const { id } = req.params;
    const activity = await Activity.findById(id);

    if (!activity || activity.user.toString() !== req.user._id.toString()) {
      return res
        .status(404)
        .json({ message: "Activity not found or access denied." });
    }

    return res.status(200).json(activity);
  } catch (error) {
    console.error("Error fetching activity by ID:", error.message);
    return res
      .status(500)
      .json({ message: "Server error. Please try again later." });
  }
};

export const updateActivity = async (req, res) => {
  try {
    const { date, time, activity, duration, difficulty } = req.body;

    if (!date || !time || !activity || !duration || !difficulty) {
      return res.status(400).json({
        message:
          "All fields are required: date, time, activity, duration, difficulty",
      });
    }

    const { id } = req.params;
    const activityRecord = await Activity.findById(id);

    if (
      !activityRecord ||
      activityRecord.user.toString() !== req.user._id.toString()
    ) {
      return res
        .status(404)
        .json({ message: "Activity not found or access denied." });
    }

    activityRecord.date = date;
    activityRecord.time = time;
    activityRecord.activity = activity;
    activityRecord.duration = duration;
    activityRecord.difficulty = difficulty;

    const updatedActivity = await activityRecord.save();

    return res.status(200).json({
      message: "Activity updated successfully.",
      data: updatedActivity,
    });
  } catch (error) {
    console.error("Error updating activity:", error.message);
    return res
      .status(500)
      .json({ message: "Server error. Please try again later." });
  }
};

export const deleteActivity = async (req, res) => {
  try {
    const { id } = req.params;
    const activity = await Activity.findById(id);

    if (!activity || activity.user.toString() !== req.user._id.toString()) {
      return res
        .status(404)
        .json({ message: "Activity not found or access denied." });
    }

    await activity.remove();

    return res.status(200).json({ message: "Activity deleted successfully." });
  } catch (error) {
    console.error("Error deleting activity:", error.message);
    return res
      .status(500)
      .json({ message: "Server error. Please try again later." });
  }
};

export const getAllActivities = async (req, res) => {
  try {
    if (!req.user.isAdmin) {
      return res.status(403).json({ message: "Access denied. Admins only." });
    }

    const activities = await Activity.find()
      .populate("user", "name email")
      .sort({ date: -1 });

    return res.status(200).json({ data: activities });
  } catch (error) {
    console.error("Error fetching all activities:", error.message);
    return res
      .status(500)
      .json({ message: "Server error. Please try again later." });
  }
};
