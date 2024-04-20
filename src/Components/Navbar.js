import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FaBars } from 'react-icons/fa';

const Navbar = () => {
  const [isNavOpen, setIsNavOpen] = useState(false);

  const toggleNav = () => {
    setIsNavOpen(!isNavOpen);
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light fixed-top">
      <div className="container">
        <a className="navbar-brand" href="/">
          Navbar
        </a>
        <button
          className="navbar-toggler"
          type="button"
          onClick={toggleNav}
          aria-expanded={isNavOpen ? 'true' : 'false'}
          aria-label="Toggle navigation"
          aria-controls="navbarNav"
        >
          <FaBars />
        </button>
        <div
          className={`collapse navbar-collapse ${isNavOpen ? 'show' : ''}`}
          id="navbarNav"
        >
          <ul className="navbar-nav ml-auto">
            <li className="nav-item active">
              <a className="nav-link" href="/" onClick={() => console.log('Home clicked')}>
                Home <span className="sr-only"> </span>
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/trending" onClick={() => console.log('Trending clicked')}>
                Trending
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/gaming" onClick={() => console.log('Gaming clicked')}>
                Gaming
              </a>
            </li>
           
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
