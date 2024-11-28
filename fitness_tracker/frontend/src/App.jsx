import React, { useState, useEffect } from "react";
import "./index.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from './components/AuthContext'; 
import Home from "./pages/Home";
import CreateActivity from "./components/CreateActivity";
import ShowActivity from "./components/ShowActivity";
import EditActivity from "./components/EditActivity";
import DeleteActivity from "./components/DeleteActivity";
import AuthPage from "./pages/AuthPage";
import SignUpForm from "./components/SignUpForm"; 

const App = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser)); 
    }
  }, []);

  useEffect(() => {
    if (user) {
      localStorage.setItem("user", JSON.stringify(user)); 
    } else {
      localStorage.removeItem("user"); 
    }
  }, [user]);

  return (
    <BrowserRouter>
      <AuthProvider> 
        <Routes>
          <Route 
            path="/activity" 
            element={user ? <Home user={user} setUser={setUser} /> : <Navigate to="/" />} 
          />
          <Route path="/activity/create" element={user ? <CreateActivity /> : <Navigate to="/" />} />
          <Route path="/activity/:id" element={user ? <ShowActivity /> : <Navigate to="/" />} />
          <Route path="/activity/edit/:id" element={user ? <EditActivity /> : <Navigate to="/" />} />
          <Route path="/activity/delete/:id" element={user ? <DeleteActivity /> : <Navigate to="/" />} />
          <Route path="/" element={<AuthPage setUser={setUser} />} />
          <Route path="/signup" element={<SignUpForm setUser={setUser} />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
};

export default App;
