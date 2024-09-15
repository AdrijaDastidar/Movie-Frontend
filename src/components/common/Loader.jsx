import React from 'react';

function Loader() {
  return (
    <div className="flex space-x-2 p-5 justify-center items-center">
      <div 
        className="bg-true-gray-500 dark:bg-true-gray-700 p-2 w-6 h-6 rounded-full animate-bounce"
        style={{ animationDelay: "0.1s" }}
      ></div>
      <div 
        className="bg-true-gray-600 p-2 w-6 h-6 rounded-full animate-bounce"
        style={{ animationDelay: "0.2s" }}
      ></div>
      <div 
        className="bg-true-gray-700 dark:bg-true-gray-500 p-2 w-6 h-6 rounded-full animate-bounce"
        style={{ animationDelay: "0.3s" }}
      ></div>
    </div>
  );
}

export default Loader;
