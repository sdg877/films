import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Spinner from "../components/Spinner";
import ActivityTable from "../components/ActivityTable";
import UserActivityTable from "../components/UserActivityTable";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

const Home = ({ user, setUser }) => {
  const [userActivities, setUserActivities] = useState([]);
  const [allActivities, setAllActivities] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDifficulty, setSelectedDifficulty] = useState('');

  useEffect(() => {
    if (user) {
      const fetchUserActivities = async () => {
        setLoading(true);
        const token = localStorage.getItem("token");
        if (!token) {
          setLoading(false);
          return;
        }

        try {
          const { data } = await axios.get(
            `${BACKEND_URL}/activity/user/${user.id}`,
            {
              headers: { Authorization: `Bearer ${token}` },
            }
          );

          const formattedData = data.data.map((activity) => ({
            ...activity,
            date: new Date(activity.date).toLocaleDateString("en-GB"),
          }));

          setUserActivities(formattedData);
        } catch (error) {
          console.error("Error fetching user activities:", error);
        }
      };

      const fetchAllActivities = async () => {
        const token = localStorage.getItem("token");
        if (!token) return;

        try {
          const { data } = await axios.get(`${BACKEND_URL}/activity/all`, {
            headers: { Authorization: `Bearer ${token}` },
          });

          const formattedData = data.data
            .map((activity) => ({
              ...activity,
              date: new Date(activity.date).toLocaleDateString("en-GB"),
            }))
            .filter((activity) => activity.user?._id !== user.id)
            .sort((a, b) => new Date(b.date) - new Date(a.date));

          setAllActivities(formattedData);
        } catch (error) {
          console.error("Error fetching all activities:", error);
        } finally {
          setLoading(false);
        }
      };

      fetchUserActivities();
      fetchAllActivities();
    }
  }, [user]);

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value.toLowerCase());
  };

  const handleDifficultyChange = (event) => {
    setSelectedDifficulty(event.target.value);
  };

  if (!user) {
    return (
      <div className="text-center">
        <h2>Log in to view activities</h2>
        <Link to="/">Go to Login</Link>
      </div>
    );
  }

  return (
    <div className="p-4">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl my-8">Activity List</h1>
        <div className="flex gap-4">
          <Link to="/activity/create">
            <button className="px-4 py-2 bg-sky-800 text-white rounded-md">
              Add Activity
            </button>
          </Link>
          <button
            className="px-4 py-2 bg-red-500 text-white rounded-md"
            onClick={logout}
          >
            Logout
          </button>
        </div>
      </div>

      {loading ? (
        <Spinner />
      ) : (
        <>
          <h2 className="text-2xl mt-8">Your Activity</h2>
          <div className="flex justify-between mb-4">
            <input
              type="text"
              placeholder="Search Your Activities"
              className="border rounded-md px-2 py-1 mr-4"
              value={searchTerm}
              onChange={handleSearchChange}
            />
            <select
              value={selectedDifficulty}
              onChange={handleDifficultyChange}
              className="border rounded-md px-2 py-1"
            >
              <option value="">All Difficulties</option>
              <option value="Easy">Easy</option>
              <option value="Medium">Medium</option>
              <option value="Hard">Hard</option>
            </select>
          </div>
          <ActivityTable
            activities={userActivities.filter((activity) =>
              activity.activity.toLowerCase().includes(searchTerm.toLowerCase()) &&
              (!selectedDifficulty || activity.difficulty === selectedDifficulty)
            )}
          />

          <h2 className="text-2xl mt-8">All Users' Activity</h2>
          <UserActivityTable activities={allActivities} />
        </>
      )}
    </div>
  );
};

export default Home;
