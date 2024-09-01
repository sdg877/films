import express from "express";
import { Activity } from "../models/activityModel.js";

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

router.get("/", async (request, response) => {
  try {
    const activityAll = await Activity.find({});
    return response.status(200).json({
      count: activityAll.length,
      data: activityAll,
    });
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message })
  }
})

router.get("/:id", async (request, response) => {
  try {
    const { id } = request.params;
    const activity = await Activity.findById(id);
    
    if (!activity) {
      return response.status(404).json({ message: "Activity not found"})
    }
    return response.status(200).json(activity);
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message })
  }
});

export default router;
