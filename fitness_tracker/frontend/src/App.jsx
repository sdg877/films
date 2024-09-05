import React, { useState } from "react";
import "./index.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import CreateActivity from "./pages/CreateActivity";
import ShowActivity from "./pages/ShowActivity";
import EditActivity from "./pages/EditActivity";
import DeleteActivity from "./pages/DeleteActivity";
import SignUpForm from "./pages/SignUpForm";
import LoginForm from "./pages/LogInForm";

const App = () => {
  const [user, setUser] = useState(null);

  return (
    <BrowserRouter>
      <div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/activity/create" element={<CreateActivity />} />
          <Route path="/activity/details/:id" element={<ShowActivity />} />
          <Route path="/activity/edit/:id" element={<EditActivity />} />
          <Route path="/activity/delete/:id" element={<DeleteActivity />} />
          <Route
            path="/users/create"
            element={<SignUpForm setUser={setUser} />}
          />
          <Route path="/login" element={<LoginForm setUser={setUser} />} />
        </Routes>

        {user && (
          <div>
            <h2>Welcome, {user.name}!</h2>
            <p>Email: {user.email}</p>
          </div>
        )}
      </div>
    </BrowserRouter>
  );
};

export default App;
