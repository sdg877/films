// import express, { response } from "express";
// import dotenv from "dotenv";
// import mongoose from "mongoose";
// import activityRoutes from './routes/activityRoutes.js';
// import userRoutes from './routes/userRoutes.js';
// import cors from "cors";

// dotenv.config();

// const app = express();

// app.use(express.json());

// app.use(cors());
// // app.use(cors({
// //   origin: 'http://localhost:3000',
// //   methods: ['GET', 'POST', 'PUT', 'DELETE'],
// //   allowedHeaders: ['Content-Type'],
// // }));

// const DATABASE_URL = process.env.DATABASE_URL;
// const PORT = process.env.PORT || 5555;

// app.get("/", (request, response) => {
//   console.log(request);
//   return response.status(200).send("Welcome to MERN stack");
// });

// app.use("/activity", activityRoutes);

// mongoose
//   .connect(DATABASE_URL)
//   .then(() => {
//     console.log("App connected to database");
//     app.listen(PORT, () => {
//       console.log(`App is listening on port: ${PORT}`);
//     });
//   })
//   .catch((error) => {
//     console.log(error);
//   });

import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";

import activityRoutes from './routes/activityRoutes.js';  // Activity routes
import userRoutes from './routes/userRoutes.js';  // Import user routes

dotenv.config();

const app = express();

app.use(express.json());
app.use(cors());

const DATABASE_URL = process.env.DATABASE_URL;
const PORT = process.env.PORT || 5555;

// Test route
app.get("/", (request, response) => {
  console.log(request);
  return response.status(200).send("Welcome to MERN stack");
});

// Use the routes
app.use("/activity", activityRoutes);  // Activity routes
app.use("/users", userRoutes);  // User routes

mongoose
  .connect(DATABASE_URL)
  .then(() => {
    console.log("App connected to database");
    app.listen(PORT, () => {
      console.log(`App is listening on port: ${PORT}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });

