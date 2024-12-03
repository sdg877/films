import React, { useState } from "react";
import Spinner from "./Spinner";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

const DeleteActivity = () => {
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "success" });
  const navigate = useNavigate();

  const handleDeleteActivity = async () => {
    setLoading(true);

    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("No authentication token found.");

      const response = await axios.delete(`${BACKEND_URL}/activity/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (response.status === 200) {
        setSnackbar({ open: true, message: "Activity deleted successfully", severity: "success" });
        setTimeout(() => navigate("/activity"), 2000);
      } else {
        throw new Error("Failed to delete the activity.");
      }
    } catch (error) {
      console.error("Delete Activity Error:", error);
      setSnackbar({ open: true, message: "Failed to delete activity.", severity: "error" });
    } finally {
      setLoading(false);
    }
  };

  const handleSnackbarClose = () => setSnackbar({ ...snackbar, open: false });

  return (
    <div className="p-4">
      <h1 className="text-3xl my-4">Delete Activity</h1>
      {loading && <Spinner />}
      <div className="flex flex-col items-center border-2 border-sky-400 rounded-xl w-[600px] p-8 mx-auto">
        <h3 className="text-2xl">Are You Sure You want to delete this activity?</h3>
        <button
          className="p-4 bg-red-600 text-white m-8 w-full"
          onClick={handleDeleteActivity}
        >
          Yes, Delete it
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

export default DeleteActivity;
