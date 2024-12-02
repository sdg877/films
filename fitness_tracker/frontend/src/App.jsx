import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./components/AuthContext";
import Home from "./pages/Home";
import CreateActivity from "./components/CreateActivity";
import ShowActivity from "./components/ShowActivity";
import EditActivity from "./components/EditActivity";
import DeleteActivity from "./components/DeleteActivity";
import AuthPage from "./pages/AuthPage";
import SignUpForm from "./components/SignUpForm";
import axios from "axios";

const App = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      const storedToken = localStorage.getItem("token");
      if (storedToken) {
        try {
          const { data } = await axios.get(
            `${import.meta.env.VITE_BACKEND_URL}/users/validate`,
            { headers: { Authorization: `Bearer ${storedToken}` } }
          );
          setUser(data.user);
        } catch (error) {
          console.error("Token validation failed:", error);
          localStorage.removeItem("token");
        }
      }
      setLoading(false);
    };

    fetchUser();
  }, []);

  useEffect(() => {
    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
    } else {
      localStorage.removeItem("user");
    }
  }, [user]);

  const isAuthenticated = !!user;

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route
            path="/activity"
            element={
              isAuthenticated ? (
                <Home user={user} setUser={setUser} />
              ) : (
                <Navigate to="/" />
              )
            }
          />
          <Route
            path="/activity/create"
            element={isAuthenticated ? <CreateActivity /> : <Navigate to="/" />}
          />
          <Route
            path="/activity/:id"
            element={isAuthenticated ? <ShowActivity /> : <Navigate to="/" />}
          />
          <Route
            path="/activity/edit/:id"
            element={isAuthenticated ? <EditActivity /> : <Navigate to="/" />}
          />
          <Route
            path="/activity/delete/:id"
            element={isAuthenticated ? <DeleteActivity /> : <Navigate to="/" />}
          />
          <Route path="/" element={<AuthPage setUser={setUser} />} />
          <Route path="/signup" element={<SignUpForm setUser={setUser} />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
};

export default App;
