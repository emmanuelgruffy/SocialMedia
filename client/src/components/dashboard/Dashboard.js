import React, { Fragment, useEffect } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { deleteAccount, getCurrentProfile } from '../../actions/profile';
import Spinner from '../layouts/Spinner';
import DashboardActions from './DashboardActions';
import Experience from './Experience';
import Education from './Education';

const Dashboard = ({ deleteAccount, getCurrentProfile, auth: { user }, profile: { profile, loading } }) => {

    useEffect(() => {
        getCurrentProfile();
    }, [getCurrentProfile]); //we want it to run once

    return loading && profile === null ? 
    <Spinner /> : 
    <Fragment>
      <h1 className="large text-primary dash-header">Dashboard</h1>
        <p className="lead">
           <i className="fas fa-user"></i> 
           Welcome { user && user.name }
        </p>
        {profile !== null ? 
        <Fragment>
            <DashboardActions />
            <br/>
            <Experience experience={profile.experience}/>
            <br/>
            <Education education={profile.education}/>

            <div className="my-2">
                <button className="btn btn-danger" onClick={() => deleteAccount()}>
                    <i className="fas fa-user-minus"></i>{' '}Delete My Account
                </button>
            </div>
        </Fragment> : 
        <Fragment>
            <p>You have not yet setup a profile, please add some info</p>
            <Link to='/create-profile' className="btn btn-primary my-1">
                Create Profile
            </Link>
        </Fragment>}
    </Fragment>
}

Dashboard.propTypes = {
    getCurrentProfile: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    profile: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth,
    profile: state.profile
})

export default connect(mapStateToProps, { deleteAccount, getCurrentProfile })(Dashboard);
