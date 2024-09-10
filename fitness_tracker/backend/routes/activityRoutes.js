// import express from "express";
// import { createActivity, getActivity } from "../controllers/activity.js";
// import authenticateUser from "../middleware/authMiddleware.js"; 

// const router = express.Router();

// router.post('/', authenticateUser, createActivity);
// router.get('/', authenticateUser, getActivity);

// router.post("/", authenticateUser, async (req, res) => {
//   try {
//     const { date, time, activity, duration, difficulty } = req.body;

//     if (!date || !time || !activity || !duration || !difficulty) {
//       return res.status(400).send({
//         message: "Please provide all required fields: date, time, activity, duration, difficulty",
//       });
//     }

//     const userId = req.user._id; // Get user ID from JWT token

//     const newActivity = {
//       user: userId, // Set the user field here
//       date,
//       time,
//       activity,
//       duration,
//       difficulty,
//     };

//     const activityRecord = await Activity.create(newActivity);

//     return res.status(201).send(activityRecord);
//   } catch (error) {
//     console.error(error.message);
//     res.status(500).send({ message: error.message });
//   }
// });

// router.get("/", authenticateUser, async (req, res) => {
//   try {
//     const userId = req.user._id; // Get user ID from JWT token
//     const activities = await Activity.find({ user: userId }); // Filter by user ID
//     res.json({ data: activities });
//   } catch (error) {
//     res.status(500).json({ error: "Server Error" });
//   }
// });


// router.get("/:id", authenticateUser, async (req, res) => {
//   try {
//     const { id } = req.params;
//     const activity = await Activity.findById(id);

//     if (!activity || activity.user.toString() !== req.user._id.toString()) {
//       return res.status(404).json({ message: "Activity not found" });
//     }

//     return res.status(200).json(activity);
//   } catch (error) {
//     console.log(error.message);
//     res.status(500).send({ message: error.message });
//   }
// });

// router.put("/:id", authenticateUser, async (req, res) => {
//   try {
//     const { date, time, activity, duration, difficulty } = req.body;

//     if (!date || !time || !activity || !duration || !difficulty) {
//       return res.status(400).send({
//         message:
//           "Please provide all required fields: date, time, activity, duration, difficulty",
//       });
//     }

//     const { id } = req.params;
//     const result = await Activity.findById(id);

//     if (!result || result.user.toString() !== req.user._id.toString()) {
//       return res.status(404).json({ message: "Activity not found!" });
//     }

//     const updatedActivity = await Activity.findByIdAndUpdate(
//       id,
//       { date, time, activity, duration, difficulty },
//       { new: true }
//     );

//     return res
//       .status(200)
//       .send({ message: "Activity updated successfully", data: updatedActivity });
//   } catch (error) {
//     console.log(error.message);
//     res.status(500).send({ message: error.message });
//   }
// });

// router.delete("/:id", authenticateUser, async (req, res) => {
//   try {
//     const { id } = req.params;
//     const activity = await Activity.findById(id);

//     if (!activity || activity.user.toString() !== req.user._id.toString()) {
//       return res.status(404).json({ message: "Activity not found!" });
//     }

//     await Activity.findByIdAndDelete(id);

//     return res
//       .status(200)
//       .json({ message: "Activity deleted successfully!" });
//   } catch (error) {
//     console.log(error.message);
//     res.status(500).send({ message: error.message });
//   }
// });

// export default router;

import express from 'express';
import { createActivity, getActivity } from '../controllers/activity.js';
import authenticateUser from '../middleware/authMiddleware.js'; 
import { Activity } from '../models/activityModel.js'; // Assuming you export Activity from this file

const router = express.Router();

// Create a new activity
router.post('/', authenticateUser, async (req, res) => {
  try {
    const { date, time, activity, duration, difficulty } = req.body;

    if (!date || !time || !activity || !duration || !difficulty) {
      return res.status(400).send({
        message: "Please provide all required fields: date, time, activity, duration, difficulty",
      });
    }

    const userId = req.user._id; // Get user ID from JWT token

    const newActivity = {
      user: userId, // Set the user field here
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

// Get all activities for the authenticated user
router.get('/', authenticateUser, async (req, res) => {
  try {
    const userId = req.user._id; // Get user ID from JWT token
    const activities = await Activity.find({ user: userId }); // Filter by user ID
    res.json({ data: activities });
  } catch (error) {
    res.status(500).json({ error: "Server Error" });
  }
});

// Get all activities for the authenticated user
router.get('/', authenticateUser, async (req, res) => {
  try {
    const userId = req.user._id; // Get user ID from JWT token
    
    // Populate the user field to get user data associated with each activity
    const activities = await Activity.find({ user: userId }).populate('user');

    if (!activities.length) {
      return res.status(404).json({ message: "No activities found for this user" });
    }

    res.json({ data: activities });
  } catch (error) {
    res.status(500).json({ error: "Server Error" });
  }
});


// // Get a specific activity by ID
// router.get('/:id', authenticateUser, async (req, res) => {
//   try {
//     const { id } = req.params;
//     const activity = await Activity.findById(id);

//     if (!activity || activity.user.toString() !== req.user._id.toString()) {
//       return res.status(404).json({ message: "Activity not found" });
//     }

//     return res.status(200).json(activity);
//   } catch (error) {
//     console.log(error.message);
//     res.status(500).send({ message: error.message });
//   }
// });

// Update a specific activity by ID
router.put('/:id', authenticateUser, async (req, res) => {
  try {
    const { date, time, activity, duration, difficulty } = req.body;

    if (!date || !time || !activity || !duration || !difficulty) {
      return res.status(400).send({
        message: "Please provide all required fields: date, time, activity, duration, difficulty",
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

    return res.status(200).send({ message: "Activity updated successfully", data: updatedActivity });
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
});

// Delete a specific activity by ID
router.delete('/:id', authenticateUser, async (req, res) => {
  try {
    const { id } = req.params;
    const activity = await Activity.findById(id);

    if (!activity || activity.user.toString() !== req.user._id.toString()) {
      return res.status(404).json({ message: "Activity not found!" });
    }

    await Activity.findByIdAndDelete(id);

    return res.status(200).json({ message: "Activity deleted successfully!" });
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
});

export default router;
