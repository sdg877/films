import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Spinner from "../components/Spinner";
import ActivityTable from "../components/ActivityTable";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

const Home = ({ user, setUser }) => {
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(false);
  const [filter, setFilter] = useState("All");
  const [filteredActivities, setFilteredActivities] = useState([]);
  const [filterValue, setFilterValue] = useState("");

  useEffect(() => {
    if (user) {
      const fetchActivities = async () => {
        setLoading(true);

        const token = localStorage.getItem("token");
        if (!token) {
          setLoading(false);
          return;
        }

        try {
          const { data } = await axios.get(`${BACKEND_URL}/activity`, {
            headers: { Authorization: `Bearer ${token}` },
          });

          const formattedData = data.data.map((activity) => ({
            ...activity,
            date: new Date(activity.date).toLocaleDateString("en-GB"),
          }));

          setActivities(formattedData);
          setFilteredActivities(formattedData);
        } catch (error) {
          if (error.response?.status === 401) {
            console.error("Unauthorized access:", error.response.data);
            setUser(null);
          } else {
            console.error("Error fetching activities:", error.message || error);
          }
        } finally {
          setLoading(false);
        }
      };

      fetchActivities();
    }
  }, [user, setUser]);

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
  };

  const handleFilterChange = (e) => {
    setFilter(e.target.value);
    setFilterValue("");
  };

  const handleFilterValueChange = (e) => {
    setFilterValue(e.target.value);
  };

  useEffect(() => {
    let filtered = activities;

    if (filter !== "All" && filterValue.trim()) {
      const value = filterValue.toLowerCase();

      switch (filter) {
        case "Date":
          filtered = activities.filter((activity) =>
            activity.date.toLowerCase().includes(value)
          );
          break;
        case "Duration":
          filtered = activities.filter((activity) =>
            activity.duration.toString().includes(value)
          );
          break;
        case "Difficulty":
          filtered = activities.filter((activity) =>
            activity.difficulty.toLowerCase().includes(value)
          );
          break;
        case "Activity":
          filtered = activities.filter((activity) =>
            activity.name.toLowerCase().includes(value)
          );
          break;
        default:
          break;
      }
    }

    setFilteredActivities(filtered);
  }, [filter, filterValue, activities]);

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

      <div className="my-4">
        <label htmlFor="filter" className="mr-2 font-semibold">
          Filter by:
        </label>
        <select
          id="filter"
          value={filter}
          onChange={handleFilterChange}
          className="border px-2 py-1 rounded-md"
        >
          <option value="All">All</option>
          <option value="Date">Date</option>
          <option value="Duration">Duration</option>
          <option value="Difficulty">Difficulty</option>
          <option value="Activity">Activity</option>
        </select>

        {filter !== "All" && (
          <input
            type="text"
            value={filterValue}
            onChange={handleFilterValueChange}
            placeholder={`Enter ${filter.toLowerCase()}`}
            className="border px-2 py-1 ml-4 rounded-md"
          />
        )}
      </div>

      {loading ? (
        <Spinner />
      ) : (
        <ActivityTable activities={filteredActivities} />
      )}
    </div>
  );
};

export default Home;
