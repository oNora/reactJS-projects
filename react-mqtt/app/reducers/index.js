import { combineReducers } from 'redux';

import allWidgets from './widgets';
import mgttConnectionState from './mqtt';

const reducers = {
    allWidgets,
    mgttConnectionState
};

const reducer = combineReducers(reducers);

export default reducer;