import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate(); 
  const handleSignIn = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:1000/user/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const json = await response.json();
      console.log(json);

       if (json.token) {
        localStorage.setItem('token', json.token);
        navigate('/user');
      } else {
        alert(json.message || 'Login failed. Please try again.');
      }
    } catch (error) {
      console.error('There was a problem with the login request:', error);
      alert('An error occurred. Please try again later.');
    }
  };

  return (
    <div
      className="w-screen h-screen flex justify-center items-center bg-cover bg-center"
      style={{ backgroundImage: 'url(https://img.freepik.com/premium-photo/poster-with-many-movies-including-one-which-has-title-movie-it_1297762-417.jpg?w=1060)' }}
    >
      <div className="bg-black bg-opacity-75 rounded-lg shadow-lg p-8 w-96shadow-lg border-2 border-black hover:shadow-[0px_8px_50px_black]">
        <h1 className="text-4xl font-semibold text-white mb-6">Sign In</h1>
        <div className="mb-4">
          <input
            className="w-full p-3 text-white bg-gray-800 rounded focus:outline-none focus:ring-2 focus:ring-red-600 hover:bg-gray-700 transition duration-300"
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <label className="text-gray-400 text-sm">Email</label>
        </div>
        <div className="mb-4">
          <input
            className="w-full p-3 text-white bg-gray-800 rounded focus:outline-none focus:ring-2 focus:ring-red-600 hover:bg-gray-700 transition duration-300"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <label className="text-gray-400 text-sm">Password</label>
        </div>
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center">
            <input type="checkbox" id="remember-me" className="text-red-600" />
            <label className="ml-2 text-white" htmlFor="remember-me">Remember me</label>
          </div>
          <span
            className="text-blue-400 cursor-pointer hover:underline"
            onClick={() => {
              // Add forgot password logic here
              console.log('Redirect to forgot password');
            }}
          >
            Forgot Password?
          </span>
        </div>
        <button
          className="w-full py-2 bg-red-600 text-white rounded hover:bg-red-700 hover:shadow-lg transition duration-300"
          onClick={handleSignIn}
        >
          Login
        </button>
        <div className="mt-4 text-center">
          <span className="text-white">Not a member ? </span>
          <span
            className="text-blue-400 mx-5 cursor-pointer hover:underline hover:text-blue-500 transition duration-300"
            onClick={() => navigate('/signup')}
          >
            Sign up
          </span>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
