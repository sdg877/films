import { Component } from "react";
import { signUp } from "../utilities/users-service";

export default class SignUpForm extends Component {
  state = {
    name: '',
    email: '',
    password: '',
    confirm: '',
    error: ''
  }

  handleChange = (evt) => {
    this.setState({
      [evt.target.name]: evt.target.value,
      error: ''
    });
  }

  handleSubmit = async (evt) => {
    evt.preventDefault();
    try {
      const { name, email, password } = this.state;

      console.log("Form Data Submitted: ", { name, email, password });

      const formData = { name, email, password };
      const user = await signUp(formData);

      console.log("User successfully signed up: ", user);

      if (this.props.setUser) {
        this.props.setUser(user);
      } else {
        console.error("setUser function is not passed as a prop");
      }
    } catch (error) {
      console.error("Sign up failed: ", error);
      this.setState({ error: 'Sign Up Failed - Try Again' });
    }
  };

  render() {
    const disable = this.state.password !== this.state.confirm;
    return (
      <div className="mt-5">
        <form autoComplete="off" onSubmit={this.handleSubmit}>
          <div className="mb-4 flex justify-center">
            <div className="w-full max-w-md">
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
              <input
                type="text"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                id="name"
                name="name"
                value={this.state.name}
                onChange={this.handleChange}
                required
              />
            </div>
          </div>
          <div className="mb-4 flex justify-center">
            <div className="w-full max-w-md">
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
              <input
                type="email"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                id="email"
                name="email"
                value={this.state.email}
                onChange={this.handleChange}
                required
              />
            </div>
          </div>
          <div className="mb-4 flex justify-center">
            <div className="w-full max-w-md">
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
              <input
                type="password"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                id="password"
                name="password"
                value={this.state.password}
                onChange={this.handleChange}
                required
              />
            </div>
          </div>
          <div className="mb-4 flex justify-center">
            <div className="w-full max-w-md">
              <label htmlFor="confirm" className="block text-sm font-medium text-gray-700">Confirm Password</label>
              <input
                type="password"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                id="confirm"
                name="confirm"
                value={this.state.confirm}
                onChange={this.handleChange}
                required
              />
            </div>
          </div>
          <div className="mb-4 flex justify-center">
            <div className="w-full max-w-md">
              <button
                type="submit"
                className={`w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white ${disable ? 'bg-gray-400' : 'bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-500 focus:outline-none focus:ring-2 focus:ring-offset-2'}`}
                disabled={disable}
              >
                SIGN UP
              </button>
            </div>
          </div>
        </form>
        <p className="text-center text-red-500 mt-4">{this.state.error}</p>
      </div>
    );
  }
}
