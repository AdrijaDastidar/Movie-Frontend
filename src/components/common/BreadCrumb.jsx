import React from 'react';
import { Link } from 'react-router-dom';

function BreadCrumb({ paths }) {
  return (
    <nav className="ml-56 py-4 text-sm uppercase text-gray-700 dark:text-gray-300">
      <ul className="flex space-x-2">
        {paths.map((path, i) => (
          <li key={i}>
            <Link
              to={path.location}
              className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
            >
              {path.name}
            </Link>
            {i < paths.length - 1 && (
              <span className="text-gray-500 dark:text-gray-400"> | </span>
            )}
          </li>
        ))}
      </ul>
    </nav>
  );
}

export default BreadCrumb;
