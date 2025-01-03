import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { login } from '../../redux/settingSlice'; // Assuming user login action is here
import { adminLogin } from '../../redux/adminSettingSlice'; // Assuming admin login action is here

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isAdmin, setIsAdmin] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSignIn = async (e) => {
    e.preventDefault();

    let resultAction;
    if (isAdmin) {
      resultAction = await dispatch(adminLogin({ email, password }));
    } else {
      resultAction = await dispatch(login({ email, password }));
    }

    if (adminLogin.fulfilled.match(resultAction)) {
      navigate('/admin'); 
    } else if (login.fulfilled.match(resultAction)) {
      navigate('/user');
    } else {
      alert(resultAction.payload || 'Login failed');
    }
  };

  return (
    <div className="w-screen h-screen flex justify-center items-center bg-cover bg-center"
      style={{ backgroundImage: 'url(https://img.freepik.com/premium-photo/poster-with-many-movies-including-one-which-has-title-movie-it_1297762-417.jpg?w=1060)' }}
    >
      <div className="bg-black bg-opacity-75 rounded-lg shadow-lg p-8 w-96 border-2 border-black hover:shadow-[0px_8px_50px_black]">
        <h1 className="text-4xl font-semibold text-white mb-6">Sign In</h1>

        {/* Tab Navigation */}
        <div className="flex justify-around mb-4">
          <div
            className={`cursor-pointer text-white ${!isAdmin ? 'border-b-2 border-red-600 text-red-600' : 'text-gray-400'}`}
            onClick={() => setIsAdmin(false)}
          >
            User Login
          </div>
          <div
            className={`cursor-pointer text-white ${isAdmin ? 'border-b-2 border-red-600' : 'text-gray-400'}`}
            onClick={() => setIsAdmin(true)}
          >
            Admin Login
          </div>
        </div>

        <form onSubmit={handleSignIn}>
          <div className="mb-4">
            <input
              className="w-full p-3 text-white bg-gray-800 rounded focus:outline-none focus:ring-2 focus:ring-red-600 hover:bg-gray-700 transition duration-300"
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="Email"
            />
          </div>
          <div className="mb-4">
            <input
              className="w-full p-3 text-white bg-gray-800 rounded focus:outline-none focus:ring-2 focus:ring-red-600 hover:bg-gray-700 transition duration-300"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="Password"
            />
          </div>
          <div className="flex justify-between items-center mb-4">
            <div className="flex items-center">
              <input type="checkbox" id="remember-me" className="text-red-600" />
              <label className="ml-2 text-white" htmlFor="remember-me">Remember me</label>
            </div>
            <span
              className="text-blue-400 cursor-pointer hover:underline"
              onClick={() => {
                console.log('Redirect to forgot password');
              }}
            >
              Forgot Password?
            </span>
          </div>
          <button
            className="w-full py-2 bg-green-600 text-white rounded hover:bg-green-700 hover:text-white transition duration-300"
            type="submit"
          >
            Login
          </button>
          <div className="mt-4 text-center">
            <span className="text-white">Not a member? </span>
            <span
              className="text-blue-400 mx-5 cursor-pointer hover:underline hover:text-blue-500 transition duration-300"
              onClick={() => navigate('/signup')}
            >
              Sign up
            </span>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
