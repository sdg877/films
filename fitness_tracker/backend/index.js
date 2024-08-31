import express, { response } from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import activityRoute from "../routes/activityRoutes.js";
import cors from "cors";

dotenv.config();

const app = express();

app.use(express.json());

app.use(cors());
// app.use(cors({
//   origin: 'http://localhost:3000',
//   methods: ['GET', 'POST', 'PUT', 'DELETE'],
//   allowedHeaders: ['Content-Type'],
// }));

const DATABASE_URL = process.env.DATABASE_URL;
const PORT = process.env.PORT || 5555;

app.get("/", (request, response) => {
  console.log(request);
  return response.status(200).send("Welcome to MERN stack");
});

app.use("/activities", activityRoute);

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
