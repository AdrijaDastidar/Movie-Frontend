import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });

  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState('');

  const navigate = useNavigate();

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name) newErrors.name = 'Required';

    if (!formData.email || !/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Invalid Email';
    }

    const passwordPattern = /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&])[A-Za-z\d!@#$%^&]{8,}$/;
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (!passwordPattern.test(formData.password)) {
      newErrors.password = 'Password must be at least 8 characters long and include letters, numbers, and special characters';
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords must match';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (validateForm()) {
      try {
        const response = await fetch('http://localhost:1000/user/create', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        });

        if (response.ok) {
          setMessage('User registered successfully');
          navigate('/login');
        } else {
          const errorData = await response.json();
          setMessage(errorData.message || 'Error registering user');
        }
      } catch (error) {
        setMessage('Error registering user');
      }
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <div
      className="w-screen h-screen flex justify-center items-center bg-cover bg-center"
      style={{ backgroundImage: 'url(https://img.freepik.com/premium-photo/poster-with-many-movies-including-one-which-has-title-movie-it_1297762-417.jpg?w=1060)' }}
    >
      <div className="bg-black bg-opacity-75 p-8 rounded-2xl w-96 shadow-lg border-2 border-black hover:shadow-[0px_8px_50px_black]">
        <h1 className="text-center text-white text-4xl mb-8">Sign up</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <input
              type="text"
              name="name"
              placeholder="Name"
              value={formData.name}
              onChange={handleChange}
              className="w-full p-2 bg-gray-800 text-white rounded focus:outline-none focus:ring-2 focus:ring-red-500 hover:bg-gray-700 transition duration-300"
            />
            {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
          </div>
          <div className="mb-4">
            <input
              type="email"
              name="email"
              placeholder="Enter your Email"
              value={formData.email}
              onChange={handleChange}
              className="w-full p-2 bg-gray-800 text-white rounded focus:outline-none focus:ring-2 focus:ring-red-500 hover:bg-gray-700 transition duration-300"
            />
            {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
          </div>
          <div className="mb-4">
            <input
              type="password"
              name="password"
              placeholder="Enter Password"
              value={formData.password}
              onChange={handleChange}
              className="w-full p-2 bg-gray-800 text-white rounded focus:outline-none focus:ring-2 focus:ring-red-500 hover:bg-gray-700 transition duration-300"
            />
            {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password}</p>}
          </div>
          <div className="mb-4">
            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm Password"
              value={formData.confirmPassword}
              onChange={handleChange}
              className="w-full p-2 bg-gray-800 text-white rounded focus:outline-none focus:ring-2 focus:ring-red-500 hover:bg-gray-700 transition duration-300"
            />
            {errors.confirmPassword && <p className="text-red-500 text-xs mt-1">{errors.confirmPassword}</p>}
          </div>
          <div className="text-center mt-6">
            <input
              type="submit"
              value="Submit"
              className="w-full p-2 bg-red-600 text-white rounded hover:bg-green-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-red-500 cursor-pointer"
            />
          </div>
        </form>
        {message && <p className="text-center text-green-500 mt-4">{message}</p>}
        <div className="text-center mt-4">
          <p className="text-white">
            Already have an account? <span className="text-blue-400 mx-5 hover:text-blue-500 cursor-pointer" onClick={() => navigate('/login')}>Login</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
