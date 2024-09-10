import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const CreateActivity = () => {
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [activity, setActivity] = useState("");
  const [duration, setDuration] = useState("");
  const [difficulty, setDifficulty] = useState("Easy");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSaveActivity = () => {
    const data = { date, time, activity, duration, difficulty };
    setLoading(true);

    axios.post("http://localhost:5500/activity", data, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`
      }
    })
    .then(() => {
      setLoading(false);
      navigate("/");
    })
    .catch((error) => {
      setLoading(false);
      console.log(error);
    });
  };

  return (
    <div className="p-4">
      <h1 className="text-3xl my-4">Add Activity</h1>
      {loading && <p>Loading...</p>}
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
          <label className="text-xl mr-4 text-gray-500">Duration (mins)</label>
          <input
            type="number"
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
        <button className="p-2 bg-sky-300 m-8" onClick={handleSaveActivity}>
          Save
        </button>
      </div>
    </div>
  );
};

export default CreateActivity;
