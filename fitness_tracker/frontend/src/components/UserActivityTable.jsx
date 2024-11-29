import React from "react";
import { Link } from "react-router-dom";

const UserActivityTable = ({ activities }) => {
  return (
    <table className="w-full border-collapse">
      <thead>
        <tr>
          <th className="border border-slate-600 rounded-md">Username</th>
          <th className="border border-slate-600 rounded-md">Date</th>
          <th className="border border-slate-600 rounded-md">Time</th>
          <th className="border border-slate-600 rounded-md">Activity</th>
          <th className="border border-slate-600 rounded-md">Duration (min)</th>
          <th className="border border-slate-600 rounded-md">Difficulty</th>
        </tr>
      </thead>
      <tbody>
        {activities.map((activity) => (
          <tr key={activity._id} className="h-8">
            <td className="border border-slate-700 text-center">{activity.username}</td>
            <td className="border border-slate-700 text-center">{activity.date}</td>
            <td className="border border-slate-700 text-center">{activity.time}</td>
            <td className="border border-slate-700 text-center">{activity.activity}</td>
            <td className="border border-slate-700 text-center">{activity.duration}</td>
            <td className="border border-slate-700 text-center">{activity.difficulty}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default UserActivityTable;
