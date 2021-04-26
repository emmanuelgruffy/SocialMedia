import { v4 as uuidv4 } from 'uuid'; //this package just generates a random id
import { SET_ALERT, REMOVE_ALERT} from './types';   


const setAlert = (msg, alertType) => dispatch => {
    const id = uuidv4(); //we use version 4 of the id generator.
    dispatch({
        type: SET_ALERT,
        payload: { msg, alertType, id }
    });

    setTimeout(() => dispatch({ type: REMOVE_ALERT, payload: id }), 2500);
};

export default setAlert;