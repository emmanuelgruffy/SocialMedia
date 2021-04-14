import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container-fluid">
        <Link to='/'>
          <i className="navbar-brand">SocialMedia</i>
          </Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
            <div className="navbar-nav right">
              <Link to="/" className="nav-link wider" aria-current="page">Developes</Link>
              <Link to='/register' className="nav-link wider" >Register</Link>
              <Link to='/login' className="nav-link wider" >Login</Link>
            </div>
          </div>
        </div>
      </nav>
    )
};

export default Navbar;
