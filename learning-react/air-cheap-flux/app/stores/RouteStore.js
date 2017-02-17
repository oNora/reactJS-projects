import AppDispatcher from '../dispatcher/AppDispatcher';
import constants from '../constants/constants';
import {ReduceStore} from 'flux/utils';

// class RouteStore extends MapStore {
class RouteStore extends ReduceStore {
  getInitialState() {
    return '';
  }
  reduce(state, action){
    switch (action.type) {
      case constants.CHOOSE_AIRPORT:
        // action.target can be either “origin” or “destination”
        // action.code contains the selected airport code
        // console.log('at(key: K): V ', at(action.target): action.code );
        // return state.set(action.target, action.code);
        // return action.code;
        return action.code;
        
      default:
        return state;
    }
  }
}
export default new RouteStore(AppDispatcher);
