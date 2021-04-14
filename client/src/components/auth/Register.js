import React, { Fragment, useState } from 'react'
import { Link } from 'react-router-dom'
const Register = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        password2: ''
    });
    return (
    <Fragment>
    <form>
    <h1 class="x-large sign-up-header">Sign Up</h1>
    <div class="form-floating">
      <input type="password" class="form-control sign-up-input" id="floatingPassword" placeholder="Password" />
      <label for="floatingPassword" className="sign-up-label">Name</label>
    </div>
    <div class="form-floating">
      <input type="email" class="form-control sign-up-input" id="floatingInput" placeholder="name@example.com" />
      <label for="floatingInput" className="sign-up-label">Email address</label>
      <p className="under-input-disclaimer">This site uses Gravatar so if you want profile image, use a Gravatar email</p>
    </div>
    <div class="form-floating">
      <input type="password" class="form-control sign-up-input" id="floatingPassword" placeholder="Password" />
      <label for="floatingPassword" className="sign-up-label">Password</label>
    </div>
    <div class="form-floating">
      <input style={{marginTop: '1%'}} type="password" class="form-control sign-up-input" id="floatingPassword" placeholder="Password" />
      <label for="floatingPassword" className="sign-up-label">Confirm Password</label>
    </div>
    <br/>   
    <button class="btn btn-lg btn-primary" type="submit">Sign in</button>
    <p class="mt-1 text-muted">Already have an account? <Link to='/login'>Login</Link></p>
    </form>
  </Fragment>
    )
}

export default Register;