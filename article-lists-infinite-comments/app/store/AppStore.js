import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import reducers from '../reducers';

const logger = (store) => (next) => (action) => {
    if (typeof action !== "function") {
        console.log('dispatching:', action);
    }
    return next(action);
};

let appStore;

if (__PRODUCTION__ == true){
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

export default appStore;