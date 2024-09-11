// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { Link } from "react-router-dom";
// import { AiOutlineEdit } from "react-icons/ai";
// import { BsInfoCircle } from "react-icons/bs";
// import { MdOutlineAddBox, MdOutlineDelete } from "react-icons/md";
// import Spinner from "../components/Spinner";
// import SignUpForm from "../components/SignUpForm";
// import LoginForm from "../components/LoginForm";

// const Home = ({ user, setUser }) => {
//   const [activities, setActivities] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [isLoginView, setIsLoginView] = useState(true);

//   useEffect(() => {
//     if (user) {
//       const fetchActivities = async () => {
//         setLoading(true);
//         try {
//           const token = localStorage.getItem("token");

//           if (!token) {
//             throw new Error("No token found.");
//           }

//           const response = await axios.get(
//             `${import.meta.env.VITE_BACKEND_URL}/activity`,
//             {
//               headers: {
//                 Authorization: `Bearer ${token}`,
//               },
//             }
//           );

//           // Process the data received from the server
//           const formattedData = response.data.data.map((activity) => {
//             const dateObj = new Date(activity.date);
//             const formattedDate = dateObj.toLocaleDateString("en-GB");
//             return { ...activity, date: formattedDate };
//           });

//           setActivities(formattedData);
//         } catch (error) {
//           if (error.response && error.response.status === 401) {
//             console.error("Unauthorized access:", error.response.data);
//             setUser(null);
//           } else {
//             console.error("Error fetching activities:", error);
//           }
//         } finally {
//           setLoading(false);
//         }
//       };

//       fetchActivities();
//     }
//   }, [user, setUser]);

//   if (!user) {
//     return (
//       <div className="p-4 max-w-md mx-auto">
//         <h1 className="text-2xl font-bold text-center mb-8">
//           Welcome to the Fitness Tracker
//         </h1>
//         <div className="flex justify-center mb-4">
//           <button
//             className={`px-4 py-2 rounded-md ${
//               isLoginView ? "bg-blue-500 text-white" : "bg-gray-200"
//             }`}
//             onClick={() => setIsLoginView(true)}
//           >
//             Login
//           </button>
//           <button
//             className={`px-4 py-2 ml-2 rounded-md ${
//               !isLoginView ? "bg-blue-500 text-white" : "bg-gray-200"
//             }`}
//             onClick={() => setIsLoginView(false)}
//           >
//             Sign Up
//           </button>
//         </div>
//         {isLoginView ? (
//           <LoginForm setUser={setUser} />
//         ) : (
//           <SignUpForm setUser={setUser} />
//         )}
//       </div>
//     );
//   }

//   return (
//     <div className="p-4">
//       <div className="flex justify-between items-center">
//         <h1 className="text-3xl my-8">Activity List</h1>
//         <Link to="/activity/create">
//           <MdOutlineAddBox className="text-sky-800 text-4xl" />
//         </Link>
//       </div>
//       {loading ? (
//         <Spinner />
//       ) : activities.length > 0 ? (
//         <table className="w-full border-separate border-spacing-2">
//           <thead>
//             <tr>
//               <th className="border border-slate-600 rounded-md">No</th>
//               <th className="border border-slate-600 rounded-md max-md:hidden">
//                 Date
//               </th>
//               <th className="border border-slate-600 rounded-md">Time</th>
//               <th className="border border-slate-600 rounded-md max-md:hidden">
//                 Activity
//               </th>
//               <th className="border border-slate-600 rounded-md">
//                 Duration (min)
//               </th>
//               <th className="border border-slate-600 rounded-md">Difficulty</th>
//               <th className="border border-slate-600 rounded-md max-md:hidden">
//                 Operations
//               </th>
//             </tr>
//           </thead>
//           <tbody>
//             {activities.map((activity, index) => (
//               <tr key={activity._id} className="h-8">
//                 <td className="border border-slate-700 rounded-md text-center">
//                   {index + 1}
//                 </td>
//                 <td className="border border-slate-700 rounded-md text-center">
//                   {activity.date}
//                 </td>
//                 <td className="border border-slate-700 rounded-md text-center">
//                   {activity.time}
//                 </td>
//                 <td className="border border-slate-700 rounded-md text-center">
//                   {activity.activity}
//                 </td>
//                 <td className="border border-slate-700 rounded-md text-center">
//                   {activity.duration}
//                 </td>
//                 <td className="border border-slate-700 rounded-md text-center">
//                   {activity.difficulty}
//                 </td>
//                 <td className="border border-slate-700 rounded-md text-center">
//                   <div className="flex justify-center gap-x-4">
//                     <Link to={`/activity/details/${activity._id}`}>
//                       <BsInfoCircle className="text-2xl text-green-800" />
//                     </Link>
//                     <Link to={`/activity/edit/${activity._id}`}>
//                       <AiOutlineEdit className="text-2xl text-yellow-600" />
//                     </Link>
//                     <Link to={`/activity/delete/${activity._id}`}>
//                       <MdOutlineDelete className="text-2xl text-red-600" />
//                     </Link>
//                   </div>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       ) : (
//         <p className="text-center text-gray-600">Please add an activity.</p>
//       )}
//     </div>
//   );
// };

// export default Home;
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Spinner from "../components/Spinner";
import SignUpForm from "../components/SignUpForm";
import LoginForm from "../components/LoginForm";
import ActivityTable from "../components/ActivityTable";
import AuthButtons from "../components/AuthButtons";

const Home = ({ user, setUser }) => {
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isLoginView, setIsLoginView] = useState(true);

  useEffect(() => {
    if (user) {
      const fetchActivities = async () => {
        setLoading(true);
        try {
          const token = localStorage.getItem("token");

          if (!token) {
            throw new Error("No token found.");
          }

          const response = await axios.get(
            `${import.meta.env.VITE_BACKEND_URL}/activity`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );

          const formattedData = response.data.data.map((activity) => {
            const dateObj = new Date(activity.date);
            const formattedDate = dateObj.toLocaleDateString("en-GB");
            return { ...activity, date: formattedDate };
          });

          setActivities(formattedData);
        } catch (error) {
          if (error.response && error.response.status === 401) {
            console.error("Unauthorized access:", error.response.data);
            setUser(null);
          } else {
            console.error("Error fetching activities:", error);
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

  if (!user) {
    return (
      <div className="p-4 max-w-md mx-auto">
        <h1 className="text-2xl font-bold text-center mb-8">Welcome to the Fitness Tracker</h1>
        <AuthButtons isLoginView={isLoginView} setIsLoginView={setIsLoginView} />
        {isLoginView ? <LoginForm setUser={setUser} /> : <SignUpForm setUser={setUser} />}
      </div>
    );
  }

  return (
    <div className="p-4">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl my-8">Activity List</h1>
        <Link to="/activity/create">
          <button className="px-4 py-2 bg-sky-800 text-white rounded-md">Add Activity</button>
        </Link>
        <button 
          className="px-4 py-2 bg-red-500 text-white rounded-md" 
          onClick={logout}
        >
          Logout
        </button>
      </div>
      {loading ? <Spinner /> : <ActivityTable activities={activities} />}
    </div>
  );
};

export default Home;
