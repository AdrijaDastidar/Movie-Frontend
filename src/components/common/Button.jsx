import React from 'react';

function Button({ onClick, text }) {
  return (
    <button
      onClick={onClick}
      className="text-lg bg-light-800 border border-dark-300 text-dark-300 dark:bg-dark-300 dark:text-light-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary rounded-md px-4 py-2 transition-colors duration-200"
    >
      {text}
    </button>
  );
}

export default Button;
