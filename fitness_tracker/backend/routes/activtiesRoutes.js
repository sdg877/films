import express from "express";
import { Activity } from "../models/activtiesModel.js";

const router = express.Router();

router.post("/", async (request, response) => {
  try {
    const { date, time, activity, duration, difficulty } = request.body;

    if (!date || !time || !activity || !duration || !difficulty) {
      return response.status(400).send({
        message:
          "Please provide all required fields: date, time, activity, duration, difficulty",
      });
    }

    const newActivity = { date, time, activity, duration, difficulty };

    const activityRecord = await Activity.create(newActivity);

    return response.status(201).send(activityRecord);
  } catch (error) {
    console.error(error.message);
    response.status(500).send({ message: error.message });
  }
});

export default router;
