import update from 'immutability-helper';
import {
    SUBSCRIPTION_SUCCESS, DISCONNECT, RECONNECT , SUBSCRIPTION_ERROR, MQTT_OFFLINE
} from '../constants/api';

const INITIAL_STATE = {
    subscribed: false,
    message: ''
};

const mgttConnectionState = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case SUBSCRIPTION_SUCCESS:
            return update(
                state, {
                    subscribed: {$set: true},
                    message: {$set: SUBSCRIPTION_SUCCESS}
                }
            );
        case DISCONNECT :
            return update(
                state, {
                    subscribed: {$set: false},
                    message: {$set: DISCONNECT}
                }
            );
        case RECONNECT :
            return update(
                state, {
                    subscribed: {$set: true},
                    message: {$set: RECONNECT}
                }
            );
        case SUBSCRIPTION_ERROR :
            return update(
                state, {
                    subscribed: {$set: false},
                    message: {$set: action.error.message}
                }
            );
        case MQTT_OFFLINE :
            return update(
                state, {
                    subscribed: {$set: false},
                    message: {$set: MQTT_OFFLINE}
                }
            );
        default:
            return state;
    }
};

export default mgttConnectionState;