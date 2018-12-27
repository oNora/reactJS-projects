import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import reducers from '../reducers';

import { createMqttClient } from "../api/api-config";


const logger = (store) => (next) => (action) => {
    if (typeof action !== "function") {
        console.log('dispatching:', action);
    }
    return next(action);
};

let appStore;

if (process.env.NODE_ENV === 'production'){
    appStore = createStore(
        reducers,
        applyMiddleware(thunk)
    );
} else {
    appStore = createStore(
        reducers,
        window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
        applyMiddleware(logger, thunk)
    );
}

createMqttClient(appStore);

export default appStore;