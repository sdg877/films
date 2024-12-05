import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import Spinner from "./Spinner"; 
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

const EditActivity = () => {
  const { id } = useParams(); 
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [activity, setActivity] = useState("");
  const [duration, setDuration] = useState("");
  const [difficulty, setDifficulty] = useState("Easy");
  const [loading, setLoading] = useState(false);
  const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "success" });
  const navigate = useNavigate();

  useEffect(() => {
    const fetchActivityDetails = async () => {
      setLoading(true);
      try {
        const token = localStorage.getItem("token");
        if (!token) throw new Error("No authentication token found.");

        const response = await axios.get(`${BACKEND_URL}/activity/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        const { date, time, activity, duration, difficulty } = response.data;
        setDate(date);
        setTime(time);
        setActivity(activity);
        setDuration(duration);
        setDifficulty(difficulty);
      } catch (error) {
        console.error("Fetch Activity Error:", error);
        setSnackbar({ open: true, message: "Failed to fetch activity details.", severity: "error" });
      } finally {
        setLoading(false);
      }
    };

    fetchActivityDetails();
  }, [id]);

  const handleEditActivity = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("No authentication token found.");

      const data = { date, time, activity, duration, difficulty };
      const response = await axios.put(`${BACKEND_URL}/activity/${id}`, data, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (response.status === 200) {
        setSnackbar({ open: true, message: "Activity updated successfully", severity: "success" });
        setTimeout(() => navigate("/activity"), 2000);
      } else {
        throw new Error("Failed to update the activity.");
      }
    } catch (error) {
      console.error("Edit Activity Error:", error);
      setSnackbar({ open: true, message: "Failed to edit activity.", severity: "error" });
    } finally {
      setLoading(false);
    }
  };

  const handleSnackbarClose = () => setSnackbar({ ...snackbar, open: false });

  return (
    <div className="p-4">
      <h1 className="text-3xl my-4">Edit Activity</h1>
      {loading && <Spinner />}
      <div className="flex flex-col border-2 border-sky-400 rounded-xl w-[600px] p-4 mx-auto">
        <div className="my-4">
          <label className="text-xl mr-4 text-gray-500">Date</label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="border-2 border-gray-500 px-4 py-2 w-full"
          />
        </div>
        <div className="my-4">
          <label className="text-xl mr-4 text-gray-500">Time</label>
          <input
            type="time"
            value={time}
            onChange={(e) => setTime(e.target.value)}
            className="border-2 border-gray-500 px-4 py-2 w-full"
          />
        </div>
        <div className="my-4">
          <label className="text-xl mr-4 text-gray-500">Activity</label>
          <input
            type="text"
            value={activity}
            onChange={(e) => setActivity(e.target.value)}
            className="border-2 border-gray-500 px-4 py-2 w-full"
          />
        </div>
        <div className="my-4">
          <label className="text-xl mr-4 text-gray-500">Duration</label>
          <input
            type="text"
            value={duration}
            onChange={(e) => setDuration(e.target.value)}
            className="border-2 border-gray-500 px-4 py-2 w-full"
          />
        </div>
        <div className="my-4">
          <label className="text-xl mr-4 text-gray-500">Difficulty</label>
          <select
            value={difficulty}
            onChange={(e) => setDifficulty(e.target.value)}
            className="border-2 border-gray-500 px-4 py-2 w-full"
          >
            <option value="Easy">Easy</option>
            <option value="Medium">Medium</option>
            <option value="Hard">Hard</option>
          </select>
        </div>
        <button
          onClick={handleEditActivity}
          className="px-4 py-2 bg-sky-800 text-white rounded-md"
        >
          Save Changes
        </button>
      </div>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert onClose={handleSnackbarClose} severity={snackbar.severity} sx={{ width: "100%" }}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default EditActivity;
