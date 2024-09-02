import React from "react";
import BackButton from "../components/BackButton";
import Spinner from "../components/Spinner";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const CreateActivity = () => {
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [activity, setActivity] = useState("");
  const [duration, setDuration] = useState("");
  const [difficulty, setDifficulty] = useState("");

  const handleSaveActivity = () => {
    const data = {
      date,
      time,
      activity,
      duration,
      difficulty
    };
    setLoading(true);
    axios.post("http://localhost:5500/activity", data)
    .then(() => {
      setLoading(false);
      Navigate("/");
    })
    .catch((error) => {
      setLoading(false);
      console.log(error);
    });
  };


  return <div>Create Activity</div>;
};

export default CreateActivity;
