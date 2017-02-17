import {Dispatcher} from 'flux';

class AppDispatcher extends Dispatcher {
  dispatch(action = {}) {
    console.log("Dispatched", action.type);
    super.dispatch(action);
  }
}

export default new AppDispatcher();