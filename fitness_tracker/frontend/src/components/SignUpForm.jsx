import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function SignUpForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirm: "",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (evt) => {
    const { name, value } = evt.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
    setError("");
  };

  const handleSubmit = async (evt) => {
    evt.preventDefault();

    if (formData.password !== formData.confirm) {
      setError("Passwords do not match");
      return;
    }

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/users/signup`,
        formData
      );

      if (response.status === 201) {
        const { token, user } = response.data;
        localStorage.setItem("token", token);
        localStorage.setItem("user", JSON.stringify(user));
        navigate("/activity");
      } else {
        const errorMessage = response.data?.message || "Signup failed";
        setError(errorMessage);
      }
    } catch (error) {
      console.error("Signup failed:", error);
      setError("An unexpected error occurred. Please try again later.");
    }
  };

  const disable = formData.password !== formData.confirm;

  return (
    <div className="mt-5">
      <form autoComplete="off" onSubmit={handleSubmit}>
        <div className="mb-4 flex justify-center">
          <div className="w-full max-w-md">
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700"
            >
              Name
            </label>
            <input
              type="text"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <div className="mb-4 flex justify-center">
          <div className="w-full max-w-md">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <input
              type="email"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <div className="mb-4 flex justify-center">
          <div className="w-full max-w-md">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <input
              type="password"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <div className="mb-4 flex justify-center">
          <div className="w-full max-w-md">
            <label
              htmlFor="confirm"
              className="block text-sm font-medium text-gray-700"
            >
              Confirm Password
            </label>
            <input
              type="password"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              id="confirm"
              name="confirm"
              value={formData.confirm}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <div className="mb-4 flex justify-center">
          <div className="w-full max-w-md">
            <button
              type="submit"
              className={`w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white ${
                disable
                  ? "bg-gray-400"
                  : "bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-500 focus:outline-none focus:ring-2 focus:ring-offset-2"
              }`}
              disabled={disable}
            >
              SIGN UP
            </button>
          </div>
        </div>
      </form>

      <p className="text-center text-red-500 mt-4">{error}</p>
    </div>
  );
}

export default SignUpForm;
