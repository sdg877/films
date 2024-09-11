import { Link } from "react-router-dom";
import { AiOutlineEdit } from "react-icons/ai";
import { BsInfoCircle } from "react-icons/bs";
import { MdOutlineDelete } from "react-icons/md";

const ActivityRow = ({ index, activity }) => {
  return (
    <tr className="h-8">
      <td className="border border-slate-700 rounded-md text-center">{index + 1}</td>
      <td className="border border-slate-700 rounded-md text-center">{activity.date}</td>
      <td className="border border-slate-700 rounded-md text-center">{activity.time}</td>
      <td className="border border-slate-700 rounded-md text-center">{activity.activity}</td>
      <td className="border border-slate-700 rounded-md text-center">{activity.duration}</td>
      <td className="border border-slate-700 rounded-md text-center">{activity.difficulty}</td>
      <td className="border border-slate-700 rounded-md text-center">
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
  );
};

export default ActivityRow;
