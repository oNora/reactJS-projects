import { CHOOSE_AIRPORT } from '../constants/constants';
// import update from 'react-addons-update'
import update from 'immutability-helper';

const initialState = {
    origin: '',
    destination: '',
};
const route = (state = initialState, action) => {
    switch (action.type) {
        case CHOOSE_AIRPORT:
            // action.target can be either “origin” or “destination”
            // action.code contains the selected airport code
            // console.log('state: ', state);
            return update(state, { [action.target]: { $set: action.code } })
        default:
            return state;
    }
};
export default route;