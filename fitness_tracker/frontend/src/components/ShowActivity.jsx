import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import Spinner from "./Spinner";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

const ShowActivity = () => {
  const [activity, setActivity] = useState({});
  const [similarActivities, setSimilarActivities] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate(); 


  const formatDate = (dateString) => {
    if (!dateString) return "";
    const [day, month, year] = dateString.split("/");
    return new Date(`${year}-${month}-${day}`).toLocaleDateString("en-GB");
  };

  useEffect(() => {
    const fetchActivity = async () => {
      setLoading(true);
      setError(null);

      try {
        const token = localStorage.getItem("token");
        if (!token) {
          throw new Error("No authentication token found. Please log in.");
        }


        const { data } = await axios.get(`${BACKEND_URL}/activity/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });


        const { data: similarData } = await axios.get(
          `${BACKEND_URL}/activity/similar?activityName=${data.activity}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );


        const formattedData = {
          ...data,
          date: formatDate(data.date),
          createdAt: formatDate(data.createdAt),
          updatedAt: formatDate(data.updatedAt),
        };

        setActivity(formattedData);


        const filteredSimilarActivities = similarData.filter(
          (activity) => activity._id !== data._id // Use _id instead of id
        );


        setSimilarActivities(filteredSimilarActivities);
      } catch (err) {
        console.error("Error fetching activity:", err);
        setError(err.response?.data?.message || err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchActivity();
  }, [id]);

  const handleClickSimilarActivity = (similarActivityId) => {
    navigate(`/activity/${similarActivityId}`);
  };

  return (
    <div className="p-4 flex justify-center items-center min-h-screen">
      <div className="w-full max-w-4xl p-4">
        <h1 className="text-3xl my-4 text-center">Show Activity</h1>

        {loading ? (
          <Spinner />
        ) : error ? (
          <div className="text-red-500">
            <p>Error: {error}</p>
          </div>
        ) : (
          <div className="flex flex-col border-2 border-sky-400 rounded-xl w-full p-4">
            <div className="my-4">
              <span className="text-3xl mr-4 text-gray-500">Date</span>
              <span className="text-3xl">{activity.date}</span>
            </div>
            <div className="my-4">
              <span className="text-3xl mr-4 text-gray-500">Time</span>
              <span className="text-3xl">{activity.time}</span>
            </div>
            <div className="my-4">
              <span className="text-3xl mr-4 text-gray-500">Activity</span>
              <span className="text-3xl">{activity.activity}</span>
            </div>
            <div className="my-4">
              <span className="text-3xl mr-4 text-gray-500">Duration</span>
              <span className="text-3xl">{activity.duration}</span>
            </div>
            <div className="my-4">
              <span className="text-3xl mr-4 text-gray-500">Difficulty</span>
              <span className="text-3xl">{activity.difficulty}</span>
            </div>
            {similarActivities.length > 0 && (
              <div className="mt-6">
                <h2 className="text-2xl mb-4">Similar Activities</h2>
                {similarActivities.map((similarActivity) => (
                  <div
                    key={similarActivity._id}
                    className="border-2 border-sky-300 p-4 mb-4 rounded-xl cursor-pointer"
                    onClick={() => handleClickSimilarActivity(similarActivity._id)} // Handle click
                  >
                    <span className="text-xl mr-4 text-gray-500">Activity</span>
                    <span>{similarActivity.activity}</span>
                    <div className="text-sm text-gray-500 mt-2">
                      <span className="mr-4">Date: {formatDate(similarActivity.date)}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ShowActivity;
