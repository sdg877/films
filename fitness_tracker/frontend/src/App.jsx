import React, { useState } from "react";
import "./index.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import CreateActivity from "./components/CreateActivity";
import ShowActivity from "./components/ShowActivity";
import EditActivity from "./components/EditActivity";
import DeleteActivity from "./components/DeleteActivity";
import SignUpForm from "./components/SignUpForm";
import LoginForm from "./components/LoginForm";

const App = () => {
  const [user, setUser] = useState(null);

  return (
    <BrowserRouter>
      <div>
        <Routes>
          <Route 
            path="/" 
            element={<Home user={user} setUser={setUser} />} 
          />
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

      </div>
    </BrowserRouter>
  );
};

export default App;
