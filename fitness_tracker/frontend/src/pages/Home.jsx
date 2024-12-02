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
          const { data } = await axios.get(`${BACKEND_URL}/activity/user/${user.id}`, {
            headers: { Authorization: `Bearer ${token}` },
          });

          const formattedData = data.data.map((activity) => ({
            ...activity,
            date: new Date(activity.date).toLocaleDateString("en-GB"),
          }));
          console.log("User ID:", user?.id);

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
      
          console.log("Fetched Activities:", data.data);
          console.log("Current User ID:", user?.id);
      
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
          <ActivityTable activities={userActivities} /> 

          <h2 className="text-2xl mt-8">All Users' Activity</h2>
          <UserActivityTable activities={allActivities} /> 
        </>
      )}
    </div>
  );
};

export default Home;
