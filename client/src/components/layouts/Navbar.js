import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { connect } from "react-redux";
import { PropTypes } from "prop-types";
import { logout } from "../../actions/auth";

const Navbar = ({ auth: { isAuthenticated, loading }, logout }) => { //deconstracting nested objects.

  const authLinks = (
    <div className="navbar-nav far-right">
    <i style={{ lineHeight: '2.3' }} className="fas fa-sign-out-alt"></i>
      <Link onClick={logout} to="/" className="nav-link wider" aria-current="page">Logout</Link>
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
          { !loading && (<Fragment>{ isAuthenticated ? authLinks : guestLinks }</Fragment>) }
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
