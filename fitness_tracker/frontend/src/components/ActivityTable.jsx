import React from "react";
import ActivityRow from "./ActivityRow";

const ActivityTable = ({ activities }) => {
  return (
    <table className="w-full border-separate border-spacing-2">
      <thead>
        <tr>
          <th className="border border-slate-600 rounded-md">No</th>
          <th className="border border-slate-600 rounded-md max-md:hidden">Date</th>
          <th className="border border-slate-600 rounded-md">Time</th>
          <th className="border border-slate-600 rounded-md max-md:hidden">Activity</th>
          <th className="border border-slate-600 rounded-md">Duration (min)</th>
          <th className="border border-slate-600 rounded-md">Difficulty</th>
          <th className="border border-slate-600 rounded-md max-md:hidden">Operations</th>
        </tr>
      </thead>
      <tbody>
        {activities.map((activity, index) => (
          <ActivityRow key={activity._id} index={index} activity={activity} />
        ))}
      </tbody>
    </table>
  );
};

export default ActivityTable;
