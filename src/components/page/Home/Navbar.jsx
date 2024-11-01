import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../../../assets/img/logo.png';

const Navbar = () => {
  return (
    <header className="header">
      <div className="container">
        <div className="header-area">
          <div className="logo">
            <Link to="/"><img src={logo} alt="logo" /></Link>
          </div>
          <div className="header-right">
            <form action="#">
              <select>
                <option value="Movies">Movies</option>
                <option value="TV Shows">TV Shows</option>
                <option value="Anime">Anime</option>
              </select>
              <input type="text" />
              <button><i className="icofont icofont-search"></i></button>
            </form>
            <ul>
              <li><a href="#">Welcome Guest!</a></li>
              <li><a className="login-popup" href="#">Login</a></li>
            </ul>
          </div>
          <div className="menu-area">
            <div className="responsive-menu"></div>
            <div className="mainmenu">
              <ul id="primary-menu">
                <li><Link className="active" to="/">Home</Link></li>
                <li><Link to="/movies">Movies</Link></li>
                <li><Link to="/top-movies">Top Movies</Link></li>
                <li><Link to="/blog">News</Link></li>
                <li><Link className="theme-btn" to="/user"><i className="icofont icofont-ticket"></i> Tickets</Link></li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
