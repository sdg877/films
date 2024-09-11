const AuthButtons = ({ isLoginView, setIsLoginView }) => {
    return (
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
    );
  };
  
  export default AuthButtons;
  