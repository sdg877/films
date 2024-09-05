import React, { useState, useEffect } from 'react';
import BackButton from './BackButton';
import Spinner from './Spinner';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';


const EditActivity = () => {
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [activity, setActivity] = useState("");
  const [duration, setDuration] = useState("");
  const [difficulty, setDifficulty] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const {id} = useParams();

  useEffect(() => {
    setLoading(true);
    axios.get(`http://localhost:5500/activity/${id}`)
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
  }, [])

  const handleEditActivity = () => {
    const data = {
      date,
      time,
      activity,
      duration,
      difficulty
    };
    setLoading(true);
    axios.put(`http://localhost:5500/activity/${id}`, data)
    .then(() => {
      setLoading(false);
      navigate('/');
    }).catch((error) => {
      setLoading(false);
      alert('An error occurred, please check console');
      console.log(error);
    })
  }
  return (
    <div className="p-4">
      <BackButton />
      <h1 className="text-3xl my-4">Edit Activity</h1>
      {loading ? <Spinner /> : ""}
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
            className="border-2 border-gray-500 px-4 py-2  w-full "
          />
        </div>
        <div className="my-4">
          <label className="text-xl mr-4 text-gray-500">Activity</label>
          <input
            type="text"
            value={activity}
            onChange={(e) => setActivity(e.target.value)}
            className="border-2 border-gray-500 px-4 py-2  w-full "
          />
        </div>
        <div className="my-4">
          <label className="text-xl mr-4 text-gray-500">Duration (mins)</label>
          <input
            type="number"
            value={duration}
            onChange={(e) => setDuration(e.target.value)}
            className="border-2 border-gray-500 px-4 py-2  w-full "
          />
        </div>
        <div className="my-4">
          <label className="text-xl mr-4 text-gray-500">Difficulty</label>
          <input
            type="text"
            value={difficulty}
            onChange={(e) => setDifficulty(e.target.value)}
            className="border-2 border-gray-500 px-4 py-2  w-full "
          />
        </div>
        <button className="p-2 bg-sky-300 m-8" onClick={handleEditActivity}>
          Edit
        </button>
      </div>
    </div>
  );
};


export default EditActivity
