import React, { Fragment, useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
//import axios from 'axios';

//Redux connectivity:
import { connect } from 'react-redux';
import setAlert from '../../actions/alert';
import { register } from '../../actions/auth';
//remember that if you want to use an action - you need to apss it in the connect export.

import PropTypes from 'prop-types';


const Register = (props) => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        password2: ''
    });
    
    const { name, email, password, password2 } = formData;

    const handleChange = e => {
      setFormData({ ...formData, [e.target.name]: e.target.value })
    }
    //e.target.name => is the value inside of each input elememt's 'name' atrrbiute
    //which are exactly the same attributes inside forData - this way we can update each field in formData according to the matching
    //input field, without having to write the function each time from scratch.

    const handleSubmit = async e => {
      e.preventDefault();
      
      if (password !== password2) {
          props.setAlert('Passwords do not match', 'danger'); //remember we are passing here 'msg' and 'alertType'
          //which will be dispatched also with a generated id.
      } else {
          props.register({ name, email, password });
          setFormData({
            name: '',
            email: '',
            password: '',
            password2: ''
          })
          //this is a test with BE and example in how we handle with axios
          // we are going to use however Redux later on
    //       const newUser = {
    //           name,
    //           email,
    //           password
    //         }
    //         try {
    //             const config = {
    //                 headers: {
    //                    'Content-Type': 'application/json' 
    //                 }
    //             }
    //             const body = JSON.stringify(newUser);

    //             const res = await axios.post('/api/users', body, config);
    //             console.log(res.data);
    //         } catch (error) {
    //             console.log(error.response.data);
    //        }
     }
    }

    if(props.isAuthenticated) {
      return <Redirect to='/dashboard' />
    }

    return (
    <Fragment>
    <h1 className="x-large sign-up-header">Sign Up</h1>
    <form onSubmit={ e => handleSubmit(e) }>
    <div className="form-floating">
      <input 
      name='name'
      type="text" 
      className="form-control sign-up-input" 
      id="floatingInput" 
      value={name} 
      onChange = { e => handleChange(e) }
      placeholder="Name" 
      // required
      />
      <label htmlFor="floatingPassword" className="sign-up-label">Name</label>
    </div>
    <div className="form-floating">
      <input 
      type="email" 
      className="form-control sign-up-input" 
      id="floatingInput" 
      placeholder="Email address" 
      name='email' 
      value={email}    
      onChange = { e => handleChange(e) }
      // required
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
      // required
      />
      <label htmlFor="floatingPassword" className="sign-up-label">Password</label>
    </div>
    <div className="form-floating">
      <input 
      style={{marginTop: '1%'}} 
      type="password" 
      className="form-control sign-up-input" 
      id="floatingPassword" 
      placeholder="Password" 
      name='password2'
      value={password2}     
      onChange = { e => handleChange(e) }
      minLength='6'
      // required
      />
      <label htmlFor="floatingPassword" className="sign-up-label">Confirm Password</label>
    </div>
    <br/>   
    <button className="btn btn-lg btn-primary" type="submit">Sign in</button>
    <p className="mt-1 text-muted">Already have an account? <Link to='/login'>Login</Link></p>
    </form>
  </Fragment>
    );
};

Register.propTypes = {
  setAlert: PropTypes.func.isRequired,
  register: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
});

//connect helps you to map state into props and usage of action creators.
//for example now here below we specified 'setAlert' action that we can now access through props.setAlert
export default connect(mapStateToProps, { setAlert, register })(Register);