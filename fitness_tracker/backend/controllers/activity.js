import { Activity } from '../models/activityModel.js';

export const createActivity = async (req, res) => {
  try {
    const { date, time, activity, duration, difficulty } = req.body;

    if (!date || !time || !activity || !duration || !difficulty) {
      return res.status(400).send({
        message: "Please provide all required fields: date, time, activity, duration, difficulty",
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
};

export const getActivity = async (req, res) => {
  try {
    const userId = req.user._id;
    const activities = await Activity.find({ user: userId });
    res.json({ data: activities });
  } catch (error) {
    res.status(500).json({ error: "Server Error" });
  }
};

// Additional controllers for update, delete, etc. can be added here
