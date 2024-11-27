const AuthButtons = ({ isLoginView, setIsLoginView }) => {
  return (
    <div className="flex justify-center space-x-4">
      <button
        className={`${
          isLoginView ? "bg-blue-500" : "bg-gray-500"
        } px-4 py-2 rounded-md text-white`}
        onClick={() => setIsLoginView(true)}
      >
        Login
      </button>
      <button
        className={`${
          !isLoginView ? "bg-blue-500" : "bg-gray-500"
        } px-4 py-2 rounded-md text-white`}
        onClick={() => setIsLoginView(false)} 
      >
        Sign Up
      </button>
    </div>
  );
};


export default AuthButtons;