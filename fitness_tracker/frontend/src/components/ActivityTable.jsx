import { Link } from 'react-router-dom';
import { AiOutlineEdit } from 'react-icons/ai';
import { BsInfoCircle } from 'react-icons/bs';
import { MdOutlineDelete } from 'react-icons/md';

const ActivityTable = ({ activities }) => {
  return (
    <table className="w-full border-collapse">
      <thead>
        <tr>
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
          <tr key={activity._id} className="h-8">
            <td className="border border-slate-700 text-center">{activity.date}</td>
            <td className="border border-slate-700 text-center">{activity.time}</td>
            <td className="border border-slate-700 text-center">{activity.activity}</td>
            <td className="border border-slate-700 text-center">{activity.duration}</td>
            <td className="border border-slate-700 text-center">{activity.difficulty}</td>
            <td className="border border-slate-700 text-center">
              <div className="flex justify-center gap-x-4">
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
  );
};

export default ActivityTable;