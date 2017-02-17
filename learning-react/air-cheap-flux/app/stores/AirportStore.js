import AppDispatcher from '../dispatcher/AppDispatcher';
import constants from '../constants/constants';
import {ReduceStore} from 'flux/utils';

class AirportStore extends ReduceStore {
  getInitialState() {
    return [];
  }
  reduce(state, action){
    switch (action.type) {

      case constants.FETCH_AIRPORTS_SUCCESS:
      console.log('action.type AirportStore: ', action.type);
        return action.payload.response;

      default:
        return state;
    }
  }
}
export default new AirportStore(AppDispatcher);