import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "./components/AuthContext";
import Home from "./pages/Home";
import CreateActivity from "./components/CreateActivity";
import ShowActivity from "./components/ShowActivity";
import EditActivity from "./components/EditActivity";
import DeleteActivity from "./components/DeleteActivity";
import AuthPage from "./pages/AuthPage";
import SignUpForm from "./components/SignUpForm";
import axios from "axios";
import Spinner from "./components/Spinner"; 

const App = () => {
  const [loading, setLoading] = useState(true);
  const { auth, login } = useAuth();

  useEffect(() => {
    const fetchUser = async () => {
      const storedToken = localStorage.getItem("token");
      if (storedToken) {
        try {
          const { data } = await axios.get(
            `${import.meta.env.VITE_BACKEND_URL}/users/validate`,
            { headers: { Authorization: `Bearer ${storedToken}` } }
          );
          login(data.user);
        } catch (error) {
          console.error("Token validation failed:", error);
          localStorage.removeItem("token");
        }
      }
      setLoading(false);
    };

    fetchUser();
  }, [login]);

  if (loading) {
    return <Spinner />; 
  }

  return (
    <BrowserRouter future={{ v7_relativeSplatPath: true }}>
      <Routes>
        <Route
          path="/activity"
          element={auth?.isAuthenticated ? <Home /> : <Navigate to="/" />}
        />
        <Route
          path="/activity/create"
          element={
            auth?.isAuthenticated ? <CreateActivity /> : <Navigate to="/" />
          }
        />
        <Route
          path="/activity/:id"
          element={
            auth?.isAuthenticated ? <ShowActivity /> : <Navigate to="/" />
          }
        />
        <Route
          path="/activity/edit/:id"
          element={
            auth?.isAuthenticated ? <EditActivity /> : <Navigate to="/" />
          }
        />
        <Route
          path="/activity/delete/:id"
          element={
            auth?.isAuthenticated ? <DeleteActivity /> : <Navigate to="/" />
          }
        />
        <Route path="/" element={<AuthPage />} />
        <Route path="/signup" element={<SignUpForm />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
