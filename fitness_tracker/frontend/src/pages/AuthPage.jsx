import React, { useState } from "react";
import AuthButtons from "../components/AuthButtons";
import LoginForm from "../components/LoginForm";
import SignUpForm from "../components/SignUpForm";

const AuthPage = ({ setUser }) => {
  const [isLoginView, setIsLoginView] = useState(true);

  return (
    <div className="p-4 max-w-md mx-auto">
      <h1 className="text-2xl font-bold text-center mb-8">Authentication</h1>
      <AuthButtons isLoginView={isLoginView} setIsLoginView={setIsLoginView} />
      {isLoginView ? (
        <LoginForm setUser={setUser} />
      ) : (
        <SignUpForm setUser={setUser} />
      )}
    </div>
  );
};

export default AuthPage;
