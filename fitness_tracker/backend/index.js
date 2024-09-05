import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";

import activityRoutes from './routes/activityRoutes.js';  
import userRoutes from './routes/userRoutes.js';  

dotenv.config();

const app = express();

app.use(express.json());
app.use(cors());

const DATABASE_URL = process.env.DATABASE_URL;
const PORT = process.env.PORT || 5555;

app.get("/", (request, response) => {
  console.log(request);
  return response.status(200).send("Welcome to MERN stack");
});

app.use("/activity", activityRoutes); 
app.use("/users", userRoutes); 

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

