import React from 'react';

function End() {
  return (
    <div className="flex flex-col items-center text-center py-6 space-y-2">
      <h3 className="text-dark-50 text-xl uppercase">The End</h3>
      <h4 className="text-true-gray-500 text-md">
        Directed by{' '}
        <a
          className="m-1 border-b-2 border-teal-700 uppercase text-true-gray-600 dark:text-true-gray-400"
          href="#"
          target="_blank"
          rel="noopener noreferrer"
        >
          Adrija
        </a>
      </h4>
      <h4 className="text-true-gray-500 text-md">
        Produced by{' '}
        <a
          className="border-2 border-teal-800 rounded-full px-1 py-px m-1 text-true-gray-600 dark:text-true-gray-400"
          href="https://www.themoviedb.org/"
          target="_blank"
          rel="noopener noreferrer"
        >
          TMDB
        </a>
      </h4>
    </div>
  );
}

export default End;
