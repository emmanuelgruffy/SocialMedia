import React, { Fragment, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';
import Navbar from './components/layouts/Navbar';
import Landing from './components/layouts/Landing';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import Dashboard from './components/dashboard/Dashboard';
import CreateProfile from './components/profile-forms/CreateProfile';
import EditProfile from './components/profile-forms/EditProfile';
import AddExperience from './components/profile-forms/AddExperience';
import AddEducation from './components/profile-forms/AddEducation';
import PrivateRoute from './components/routing/PrivateRoute';

//React-Redux
import { Provider } from 'react-redux';
//Redux
import store from './store';
import Alert from './components/layouts/Alert';
import {loadUser } from './actions/auth';
import setAuthToken from '../src/utils/setAuthToken'

if(localStorage.token) {
  setAuthToken(localStorage.token);
}

const App = () => {
  //remember that fragment is a ghost element that won't show in the dom, and will allow us to render multiple lements without having need 
  //to wrap them in a parent element.

//as soon as the app renderred we want to login user in case they have a valid token - this is why we will dispatch the loadUser from here
//already - note that we don't user React class component so we need useEffect once app.js rendered and then store.dispatch loadUser.
useEffect(() => {
  store.dispatch(loadUser());
}, []) //remember that empty array as second arguments will make sur ethis will run only once as app.js rendered and that's it.
//you can add props in the [] and then only once these props are updated - will useEffect rerun again.


  return (
    // we have to wrap our application in 'Provider' so that react and redux are combined, passing the 'store' prop
    //which is the boiler plate file we created to initialize redux.
    <Provider store={store}>
    <Router>
    <Fragment>
      <Navbar />
      <Route exact path="/" component={Landing} />
      <section className="container">
      <Alert/>
        <Switch>
          <Route exact path="/register" component={Register} />
          <Route exact path="/login" component={Login} />
          <PrivateRoute exact path='/dashboard' component={Dashboard} />
          <PrivateRoute exact path='/create-profile' component={CreateProfile} />
          <PrivateRoute exact path='/edit-profile' component={EditProfile} />
          <PrivateRoute exact path='/add-experience' component={AddExperience} />
          <PrivateRoute exact path='/add-education' component={AddEducation} />
        </Switch>
      </section>
    </Fragment>
    </Router>
    </Provider>
  );
}

export default App;
