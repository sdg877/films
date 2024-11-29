const UserActivityTable = ({ activities }) => {
  return (
    <table className="w-full border-collapse">
      <thead>
        <tr>
          
          <th className="border border-slate-600 rounded-md">Activity</th>
          <th className="border border-slate-600 rounded-md">Date</th>
          <th className="border border-slate-600 rounded-md">Duration (min)</th>
          <th className="border border-slate-600 rounded-md">Difficulty</th>
          <th className="border border-slate-600 rounded-md max-md:hidden">User Name</th>
        </tr>
      </thead>
      <tbody>
        {activities.map((activity, index) => (
          <tr key={activity._id} className="h-8">
            
            <td className="border border-slate-700 text-center">{activity.activity}</td>
            <td className="border border-slate-700 text-center">{activity.date}</td>
            <td className="border border-slate-700 text-center">{activity.duration}</td>
            <td className="border border-slate-700 text-center">{activity.difficulty}</td>
            <td className="border border-slate-700 text-center">{activity?.user?.name}</td> 
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default UserActivityTable;
