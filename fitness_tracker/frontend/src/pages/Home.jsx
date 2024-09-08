// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { Link } from "react-router-dom";
// import { AiOutlineEdit } from "react-icons/ai";
// import { BsInfoCircle } from "react-icons/bs";
// import { MdOutlineAddBox, MdOutlineDelete } from "react-icons/md";
// import Spinner from "../components/Spinner";
// import SignUpForm from "../components/SignUpForm";
// import LoginForm from "../components/LoginForm";
// import CreateActivity from "../components/CreateActivity";

// const Home = ({ user, setUser }) => {
//   const [activity, setActivity] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [isLoginView, setIsLoginView] = useState(true);

//   useEffect(() => {
//     if (user) {
//       const fetchActivities = async () => {
//         setLoading(true);
//         try {
//           const token = localStorage.getItem("token"); // Retrieve token from localStorage

//           const response = await axios.get(
//             `${import.meta.env.VITE_BACKEND_URL}/activity`,
//             {
//               headers: {
//                 Authorization: `Bearer ${token}`, // Send the token in the Authorization header
//               },
//             }
//           );

//           // Assuming response contains an array of activities and each activity has a userId
//           const filteredActivities = response.data.data.filter(
//             (activity) => activity.userId === user._id
//           );

//           const formattedData = filteredActivities.map((activity) => {
//             const dateObj = new Date(activity.date);
//             const formattedDate = dateObj.toLocaleDateString("en-GB");
//             return { ...activity, date: formattedDate };
//           });

//           setActivity(formattedData);
//         } catch (error) {
//           console.error("Error fetching activities:", error);
//         } finally {
//           setLoading(false);
//         }
//       };
//       fetchActivities();
//     }
//   }, [user]);

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
//       ) : (
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
//             {activity.map((activity, index) => (
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
//       )}
//     </div>
//   );
// };

// export default Home;

// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { Link } from "react-router-dom";
// import { AiOutlineEdit } from "react-icons/ai";
// import { BsInfoCircle } from "react-icons/bs";
// import { MdOutlineAddBox, MdOutlineDelete } from "react-icons/md";
// import Spinner from "../components/Spinner";
// import SignUpForm from "../components/SignUpForm";
// import LoginForm from "../components/LoginForm";
// import CreateActivity from "../components/CreateActivity";

// const Home = ({ user, setUser }) => {
//   const [activity, setActivity] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [isLoginView, setIsLoginView] = useState(true);

//   useEffect(() => {
//     if (user) {
//       const fetchActivities = async () => {
//         setLoading(true);
//         try {
//           const token = localStorage.getItem("token"); // Retrieve token from localStorage

//           const response = await axios.get(
//             `${import.meta.env.VITE_BACKEND_URL}/activity`,
//             {
//               headers: {
//                 Authorization: `Bearer ${token}`, // Send the token in the Authorization header
//               },
//             }
//           );

//           // Assuming response contains an array of activities and each activity has a userId
//           const filteredActivities = response.data.data.filter(
//             (activity) => activity.userId === user._id
//           );

//           const formattedData = filteredActivities.map((activity) => {
//             const dateObj = new Date(activity.date);
//             const formattedDate = dateObj.toLocaleDateString("en-GB");
//             return { ...activity, date: formattedDate };
//           });

//           setActivity(formattedData);
//         } catch (error) {
//           console.error("Error fetching activities:", error);
//         } finally {
//           setLoading(false);
//         }
//       };
//       fetchActivities();
//     }
//   }, [user]);

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
//       ) : (
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
//             {activity.map((activity, index) => (
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
//       )}
//     </div>
//   );
// };

// export default Home;

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
//             throw new Error("No token found, please log in.");
//           }
  
//           const response = await axios.get(
//             `${import.meta.env.VITE_BACKEND_URL}/activity`,
//             {
//               headers: {
//                 Authorization: `Bearer ${token}`,
//               },
//             }
//           );
  
//           // Assuming response.data.data already contains only the user's activities
//           const formattedData = response.data.data.map((activity) => {
//             const dateObj = new Date(activity.date);
//             const formattedDate = dateObj.toLocaleDateString("en-GB");
//             return { ...activity, date: formattedDate };
//           });
  
//           setActivity(formattedData);
//         } catch (error) {
//           console.error("Error fetching activities:", error);
//         } finally {
//           setLoading(false);
//         }
//       };
//       fetchActivities();
//     }
//   }, [user]);
  

//   // useEffect(() => {
//   //   if (user) {
//   //     const fetchActivities = async () => {
//   //       setLoading(true);
//   //       try {
//   //         const token = localStorage.getItem("token"); // Retrieve the token
//   //         if (!token) {
//   //           throw new Error("No token found, please log in.");
//   //         }

//   //         // Debugging logs
//   //         console.log("Authorization header:", `Bearer ${token}`);

//   //         const response = await axios.get(
//   //           `${import.meta.env.VITE_BACKEND_URL}/activity`,
//   //           {
//   //             headers: {
//   //               Authorization: `Bearer ${token}`, // Attach the token
//   //             },
//   //           }
//   //         );

//   //         const filteredActivities = response.data.data.filter(
//   //           (activity) => activity.userId === user._id
//   //         );

//   //         const formattedData = filteredActivities.map((activity) => {
//   //           const dateObj = new Date(activity.date);
//   //           const formattedDate = dateObj.toLocaleDateString("en-GB");
//   //           return { ...activity, date: formattedDate };
//   //         });

//   //         setActivities(formattedData); // Set activities after formatting
//   //       } catch (error) {
//   //         console.error("Error fetching activities:", error);
//   //       } finally {
//   //         setLoading(false);
//   //       }
//   //     };
//   //     fetchActivities();
//   //   }
//   // }, [user]);

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
//       ) : (
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
//       )}
//     </div>
//   );
// };

// export default Home;

import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { AiOutlineEdit } from "react-icons/ai";
import { BsInfoCircle } from "react-icons/bs";
import { MdOutlineAddBox, MdOutlineDelete } from "react-icons/md";
import Spinner from "../components/Spinner";
import SignUpForm from "../components/SignUpForm";
import LoginForm from "../components/LoginForm";

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

          // Ensure the token exists
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

          // Filter activities based on user ID
          const filteredActivities = response.data.data.filter((activity) => {
            // Ensure that activity.user is defined and can be compared
            return activity.user && activity.user.toString() === user._id.toString();
          });

          const formattedData = filteredActivities.map((activity) => {
            const dateObj = new Date(activity.date);
            const formattedDate = dateObj.toLocaleDateString("en-GB");
            return { ...activity, date: formattedDate };
          });

          setActivities(formattedData); // Update the state with the filtered activities
        } catch (error) {
          // Check if the error status is 401 and handle accordingly
          if (error.response && error.response.status === 401) {
            console.error("Unauthorized access:", error.response.data);
            setUser(null); // Clear user state to redirect to login
          } else {
            console.error("Error fetching activities:", error);
          }
        } finally {
          setLoading(false);
        }
      };
      fetchActivities();
    }
  }, [user, setUser]); // Add setUser to the dependency array to handle changes

  if (!user) {
    return (
      <div className="p-4 max-w-md mx-auto">
        <h1 className="text-2xl font-bold text-center mb-8">
          Welcome to the Fitness Tracker
        </h1>
        <div className="flex justify-center mb-4">
          <button
            className={`px-4 py-2 rounded-md ${
              isLoginView ? "bg-blue-500 text-white" : "bg-gray-200"
            }`}
            onClick={() => setIsLoginView(true)}
          >
            Login
          </button>
          <button
            className={`px-4 py-2 ml-2 rounded-md ${
              !isLoginView ? "bg-blue-500 text-white" : "bg-gray-200"
            }`}
            onClick={() => setIsLoginView(false)}
          >
            Sign Up
          </button>
        </div>
        {isLoginView ? (
          <LoginForm setUser={setUser} />
        ) : (
          <SignUpForm setUser={setUser} />
        )}
      </div>
    );
  }

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
        <table className="w-full border-separate border-spacing-2">
          <thead>
            <tr>
              <th className="border border-slate-600 rounded-md">No</th>
              <th className="border border-slate-600 rounded-md max-md:hidden">
                Date
              </th>
              <th className="border border-slate-600 rounded-md">Time</th>
              <th className="border border-slate-600 rounded-md max-md:hidden">
                Activity
              </th>
              <th className="border border-slate-600 rounded-md">
                Duration (min)
              </th>
              <th className="border border-slate-600 rounded-md">Difficulty</th>
              <th className="border border-slate-600 rounded-md max-md:hidden">
                Operations
              </th>
            </tr>
          </thead>
          <tbody>
            {activities.map((activity, index) => (
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
      )}
    </div>
  );
};

export default Home;

