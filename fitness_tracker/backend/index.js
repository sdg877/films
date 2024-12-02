import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";
import authenticateUser from "./middleware/authenticateUser.js";
import activityRoutes from "./routes/activityRoutes.js"
import userRoutes from "./routes/userRoutes.js";

dotenv.config();

const app = express();

app.use(express.json());
app.use(cors());

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

const DATABASE_URL = process.env.DATABASE_URL;
const PORT = process.env.PORT || 5555;

app.get("/user/:userId", async (req, res) => {
  const { userId } = req.params;
  try {
    const activities = await Activity.find({ userId });
    res.json({ data: activities });
  } catch (error) {
    res.status(500).json({ error: "Server Error" });
  }
});

app.use("/activity", authenticateUser, activityRoutes);
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
