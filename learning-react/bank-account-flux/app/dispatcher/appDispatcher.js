import {Dispatcher} from 'flux';
// standard way to use dispatcher
// export default new Dispatcher();

// extend the standard dispatcher
// log every action that gets dispatched,
class AppDispatcher extends Dispatcher {
    dispatch(action = {}) {
        console.log("Dispatched", action);
        super.dispatch(action);
    }
}

export default new AppDispatcher();