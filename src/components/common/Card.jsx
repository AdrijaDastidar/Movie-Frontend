import React from 'react';

export default function Card({ image, title, showTitle, transition }) {
  return (
    <div className="relative text-center w-full h-full bg-true-gray-400 dark:bg-dark-800 rounded-2xl overflow-hidden shadow-md">
      {image ? (
        <img
          className={`w-full h-full object-cover ${
            transition ? "transition-transform duration-500 ease-out transform hover:scale-110 hover:shadow-lg" : ""
          }`}
          src={image}
          alt={`Poster for ${title}`}
        />
      ) : (
        <div className="flex items-center justify-center h-full text-dark-50 dark:text-light-300">Image not available</div>
      )}
      {(showTitle || !image) && (
        <h4 className="absolute bottom-0 w-full text-white backdrop-filter backdrop-brightness-50 backdrop-blur-sm p-2 text-sm">
          {title}
        </h4>
      )}
    </div>
  );
}
