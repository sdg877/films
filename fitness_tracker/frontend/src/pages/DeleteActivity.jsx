import React, { useState } from 'react';
import BackButton from '../components/BackButton';
import Spinner from '../components/Spinner';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const DeleteActivity = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();

  const handleDeleteActivity = () => {
    setLoading(true);
    axios.delete(`http://localhost:5500/activity/${id}`)
    .then(() => {
      setLoading(false);
      alert("Book deleted successfully");
      navigate("/");
    }).catch((error) => {
      setLoading(false);
      alert('An error occurred, please check console');
      console.log(error);
    })
 

  }

  return (
    <div className="p-4">
      <BackButton />
      <h1 className="text-3xl my-4">Delete Activity</h1>
      {loading ? <Spinner /> : ""}
      <div className="flex flex-col items-center border-2 border-sky-400 rounded-xl w-[600px] p-8 mx-auto">
        <h3 className="text-2xl">Are You Sure You want to delete this activity?</h3>

        <button
          className="p-4 bg-red-600 text-white m-8 w-full"
          onClick={handleDeleteActivity}
        >
          Yes, Delete it
        </button>
      </div>
    </div>
  );
};
export default DeleteActivity
