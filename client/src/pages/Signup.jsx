



import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Signup() {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    email: '', password: ''
  });

  const handleInp = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };


  const subData = async (e) => {
    e.preventDefault();
    try {
        const response = await axios.post('/signup', user);
        localStorage.setItem('token', response.data.token);
        toast.success("Signup successful!");
        setTimeout(() => {
          navigate('/signin');
      }, 1000);
    } catch (error) {
        toast.error(error.response?.data?.msg || "Error during sign up");
    }
};



  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-teal-800 to-teal-400 shadow-md">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-lg transform transition-transform ">
        <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">Create Your Account</h2>
        <form onSubmit={subData} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email Address</label>
            <input
              type='email'
              name="email"
              id="email"
              value={user.email}
              onChange={handleInp}
              placeholder="Enter your email"
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm transition-transform hover:bg-gray-50"
              required
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
            <input
              type="password"
              name="password"
              id="password"
              value={user.password}
              onChange={handleInp}
              placeholder="Enter your password"
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm transition-transform hover:bg-gray-50"
              required
            />
          </div>
    
          <button
            type="submit"
            className="w-full bg-teal-600 text-white py-2 px-4 rounded-lg shadow-md hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Sign Up
          </button>
        </form>
        <p className="mt-4 text-center text-sm text-gray-600">
          Already have an account? <Link to="/signin" className="font-medium text-teal-600 hover:text-teal-400">Sign In</Link>
        </p>
       
      </div>
      <ToastContainer/>
    </div>
  );
}

export default Signup;

//////////////