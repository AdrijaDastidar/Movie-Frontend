import React from 'react';

import TitleOverview from './TitleOverview';
import Card from './Card';
import Loader from './Loader';

import ImdbLogo from '../../assets/img/imdb-logo.svg';
import FacebookLogo from '../../assets/img/facebook-logo.svg';
import TwitterLogo from '../../assets/img/twitter-logo.svg';
import InstagramLogo from '../../assets/img/instagram-logo.svg';

function ActorDetails({ actor, loading, onClose }) {
  return (
    <div className="fixed inset-0 z-40 px-4 py-16 overflow-auto bg-black bg-opacity-75">
      {loading && <Loader />}
      {!loading && (
        <div className="relative p-2 w-full max-w-3xl m-auto flex flex-col sm:flex-row rounded-2xl bg-light-800 text-dark-50 dark:bg-dark-500 dark:text-light-800">
          <span
            className="absolute opacity-50 hover:opacity-100 p-0.5 m-2 z-50 bg-true-gray-400 dark:bg-dark-50 rounded-full right-0 top-0"
            onClick={onClose}
          >
            <svg
              className="h-10 w-10 fill-current text-gray-300 hover:text-gray-100"
              role="button"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
            >
              <title>Close</title>
              <path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z" />
            </svg>
          </span>

          <div className="w-auto h-full sm:w-80">
            <Card image={actor.data.profile_path} />
          </div>

          <div className="flex-1 p-2">
            <h3 className="text-xl font-bold">{actor.data.name}</h3>

            <div className="flex space-x-2 items-center my-2">
              {actor.links.imdb && <IconLink icon={ImdbLogo} link={actor.links.imdb} />}
              {actor.links.instagram && <IconLink icon={InstagramLogo} link={actor.links.instagram} />}
              {actor.links.twitter && <IconLink icon={TwitterLogo} link={actor.links.twitter} />}
              {actor.links.facebook && <IconLink icon={FacebookLogo} link={actor.links.facebook} />}
            </div>

            <TitleOverview text={actor.data.biography} limit={500} />

            <div className="my-4 text-sm">
              <div>
                <span className="font-bold">Born: </span>
                {new Date(actor.data.birthday).toDateString()}
              </div>
              <div>
                <span className="font-bold">Birth Place: </span>
                {actor.data.place_of_birth}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function IconLink({ icon, link }) {
  return (
    <a href={link} target="_blank" rel="noopener noreferrer">
      <img className="w-8" src={icon} alt="Social Media Icon" />
    </a>
  );
}

export default ActorDetails;
