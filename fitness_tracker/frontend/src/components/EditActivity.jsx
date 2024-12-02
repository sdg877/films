import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { useAuth } from './AuthContext';  

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

const EditActivity = () => {
  const { auth } = useAuth(); 
  const { user } = auth;
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [activity, setActivity] = useState("");
  const [duration, setDuration] = useState("");
  const [difficulty, setDifficulty] = useState("Easy");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    if (!user || !user.id) {
      alert("User not logged in or invalid user ID!");
      navigate("/login");
      return;
    }

    setLoading(true);
    axios.get(`${BACKEND_URL}/activity/user/${user.id}`)
      .then((response) => {
        setDate(response.data.date);
        setTime(response.data.time);
        setActivity(response.data.activity);
        setDuration(response.data.duration);
        setDifficulty(response.data.difficulty);
        setLoading(false);
      }).catch((error) => {
        setLoading(false);
        alert('An error occurred, please check console');
        console.log(error);
      });
  }, [id, user, navigate]);

  const handleEditActivity = () => {
    if (!user || !user.id) {
      alert("User not logged in or invalid user ID!");
      return;
    }

    const data = {
      date,
      time,
      activity,
      duration,
      difficulty
    };
    setLoading(true);
    axios.put(`${BACKEND_URL}/activity/${user.id}`, data)
      .then(() => {
        setLoading(false);
        navigate('/');
      }).catch((error) => {
        setLoading(false);
        alert('An error occurred, please check console');
        console.log(error);
      });
  }

  return (
    <div className="p-4">
      <h1 className="text-3xl my-4">Edit Activity</h1>
      {loading ? <div>Loading...</div> : ""}
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
    </div>
  );
};

export default EditActivity;
