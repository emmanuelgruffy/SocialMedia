import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { connect } from "react-redux";
import { PropTypes } from "prop-types";
import { logout } from "../../actions/auth";

const Navbar = ({ auth: { isAuthenticated, loading }, logout }) => { //deconstracting nested objects.

  const authLinks = (
    <div className="navbar-nav right">
      <ul className="navbar-nav far">
        <li className="nav-link wider" aria-current="page">
          <Link to="/dashboard">
          <i className="fas fa-user" />{' '}
           Dashboard
          </Link>
        </li>
        <li className="nav-link wider" aria-current="page">
          <Link onClick={logout} to="/">
            <i className="fas fa-sign-out-alt" />{' '}
            <span>Logout</span>
          </Link>
        </li>
      </ul>
    </div>
  );

  const guestLinks = (
    <div className="navbar-nav right">
      <Link to="/" className="nav-link wider" aria-current="page">Developes</Link>
      <Link to='/register' className="nav-link wider" >Register</Link>
      <Link to='/login' className="nav-link wider" >Login</Link>
    </div>
  );

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container-fluid">
        <Link to='/'>
          <i className="navbar-brand">SocialMedia</i>
        </Link>
        <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
          {!loading && (<Fragment>{isAuthenticated ? authLinks : guestLinks}</Fragment>)}
        </div>
      </div>
    </nav>
  )
};

Navbar.propTypes = {
  logout: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps, { logout })(Navbar);
