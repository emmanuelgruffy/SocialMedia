import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

//we are destructuring 'alerts' prop from our props object.
//now we are returning only in case alerts prop is not null and length is > 0, only then we will map on it and return the alert messages.

const Alert = ({ alerts }) => {
    console.log(alerts);
    return (
        alerts !== null && alerts.length > 0 && alerts.map(alert => (
            <div key={alert.id} className={`alert alert-${alert.alertType}`}>
                {alert.msg}
            </div>
        ))
    )
}


Alert.propTypes = {
    alerts: PropTypes.array.isRequired
}

//we want to get the state from our redux store - and to map it into our component store
//remember that we export the alert reducer, in our combineReducer export.
//so the way to reference this state is by calling the reducer that we exprted - 'alert'

const mapStateToProps = state => ({
    alerts: state.alert
});

export default connect(mapStateToProps)(Alert);
