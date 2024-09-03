import React, { useEffect, useState } from "react";
import axios from "axios";
import Spinner from "../components/Spinner";
import { Link } from "react-router-dom";
import { AiOutlineEdit } from "react-icons/ai";
import { BsInfoCircle } from "react-icons/bs";
import { MdOutlineAddBox, MdOutlineDelete } from "react-icons/md";
import CreateActivity from "./CreateActivity";

const Home = () => {
  const [activity, setActivity] = useState([]);
  const [loading, setLoading] = useState(false);


useEffect(() => {
    setLoading(true);
    axios
      .get("http://localhost:5500/activity")
      .then((response) => {
        const formattedData = response.data.data.map((activity) => {
          const dateObj = new Date(activity.date);
          const formattedDate = dateObj.toLocaleDateString("en-GB"); 
          return { ...activity, date: formattedDate };
        });
        setActivity(formattedData);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, []);

  return (
    <div className="p-4">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl my-8">Activity List</h1>
        <Link to="/activity/create">
          <MdOutlineAddBox className="text-sky-800 text-4xl" />
        </Link>
      </div>
      {loading ? (
        <Spinner />
      ) : (
        <table className="w-full border-seperate border-spacing-2">
          <thead>
            <tr>
            <th className="birder border-slate-600 rounded-md">No</th>
              <th className="birder border-slate-600 rounded-md max-md:hidden">
                Date
              </th>
              <th className="birder border-slate-600 rounded-md">Time</th>
              <th className="birder border-slate-600 rounded-md max-md:hidden">
                Activity
              </th>
              <th className="birder border-slate-600 rounded-md"> Duration (min)</th>
              <th className="birder border-slate-600 rounded-md">
              Difficulty
              </th>
              <th className="birder border-slate-600 rounded-md max-md:hidden">
               
            Operations
              </th>
            </tr>
          </thead>
          <tbody>
            {activity.map((activity, index) => (
              <tr key={activity._id} className="h-8">
                <td className="border border-slate-700 rounded-md text-center">
                  {index + 1}
                </td>
                <td className="border border-slate-700 rounded-md text-center">
                  {activity.date}
                </td>
                <td className="border border-slate-700 rounded-md text-center">
                  {activity.time}
                </td>
                <td className="border border-slate-700 rounded-md text-center">
                  {activity.activity}
                </td>
                <td className="border border-slate-700 rounded-md text-center">
                  {activity.duration}
                </td>
                <td className="border border-slate-700 rounded-md text-center">
                  {activity.difficulty}
                </td>
                <td className="border border-slate-700 rounded-md text-center">
                  <div className="flex justofy-center gap-x-4">
                    <Link to={`/activity/details/${activity._id}`}>
                      <BsInfoCircle className="text-2xl text-green-800" />
                    </Link>
                    <Link to={`/activity/edit/${activity._id}`}>
                      <AiOutlineEdit className="text-2xl text-yellow-600" />
                    </Link>
                    <Link to={`/activity/delete/${activity._id}`}>
                      <MdOutlineDelete className="text-2xl text-red-600" />
                    </Link>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Home;
