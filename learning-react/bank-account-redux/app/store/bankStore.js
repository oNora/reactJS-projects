import { createStore, applyMiddleware } from 'redux'
import bankReducer from '../reducer/bankReducer';

const logger = (store) => (next) => (action) => {
    console.log('dispatching:', action);
    return next(action);
}

const bankStore = createStore(
    bankReducer,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
    applyMiddleware(logger) // enhance the store with the logger middleware
);

export default bankStore;