import { RECEIVE_AIRPORTS } from '../constants/constants';

const airports = (state = [], action) => {
    switch (action.type) {
        case RECEIVE_AIRPORTS:
            return action.airports;
        default:
            return state;
    }
};

export default airports;