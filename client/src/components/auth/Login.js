import React, { Fragment, useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { login } from '../../actions/auth';

//import axios from 'axios';

const Login = ({ login, isAuthenticated }) => {

    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });

    const {  email, password, } = formData;

    const handleChange = e => {
      setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    const handleSubmit = async e => {
        e.preventDefault();
        login(email, password);
        
    }
    
    //Redirect if logged in:
    if (isAuthenticated) {
      return <Redirect to='/dashboard' />;
    }

    return (
    <Fragment>
    <h1 className="x-large sign-up-header">Login</h1>
    <form onSubmit={ e => handleSubmit(e) }>
    <div className="form-floating">
      <input 
      type="email" 
      className="form-control sign-up-input" 
      id="floatingInput" 
      placeholder="Email address" 
      name='email' 
      value={email}    
      onChange = { e => handleChange(e) }
      required
      />
      <label htmlFor="floatingInput" className="sign-up-label">Email address</label>
      <p className="under-input-disclaimer">This site uses Gravatar so if you want profile image, use a Gravatar email</p>
    </div>
    <div className="form-floating">
      <input 
      type="password" 
      className="form-control sign-up-input" 
      id="floatingPassword" 
      placeholder="Password" 
      name='password' 
      value={password} 
      onChange = { e => handleChange(e) }  
      minLength='6' 
      required
      />
      <label htmlFor="floatingPassword" className="sign-up-label">Password</label>
    </div>
    <br/>   
    <button className="btn btn-lg btn-primary" type="submit">Login</button>
    <p className="mt-1 text-muted">Don't have an account? <Link to='/register'>Sign-up</Link></p>
    </form>
  </Fragment>
    )
}

Login.propTypes = {
  login: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, { login })(Login);