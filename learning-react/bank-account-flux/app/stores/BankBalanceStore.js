// import {EventEmitter} from 'fbemitter'; // alternative of  Node.js a default event emitter to be supported on browsers
// import {Store} from 'flux/utils'; // use this instead EventEmitter
import {
    ReduceStore
} from 'flux/utils'; // use this instead EventEmitter
import AppDispatcher from '../dispatcher/appDispatcher';
import bankConstants from '../constants/constants';

// implementation with EventEmitter
// const CHANGE_EVENT = 'change';
// let __emitter = new EventEmitter();
// let balance = 0;

// let BankBalanceStore = {
//     getState() {
//         return balance;
//     },
//     addListener: (callback) => {
//         return __emitter.addListener(CHANGE_EVENT, callback);
//     },
// };

// BankBalanceStore.dispatchToken = AppDispatcher.register((action) => {
//     switch (action.type) {
//         case bankConstants.CREATED_ACCOUNT:
//             balance = 0;
//             __emitter.emit(CHANGE_EVENT);
//             break;
//         case bankConstants.DEPOSITED_INTO_ACCOUNT:
//             balance = balance + action.ammount;
//             __emitter.emit(CHANGE_EVENT);
//             break;
//         case bankConstants.WITHDREW_FROM_ACCOUNT:
//             balance = balance - action.ammount;
//             __emitter.emit(CHANGE_EVENT);
//             break;
//     }
// });

// export default BankBalanceStore;

// implementation with Store
// let balance = 0;
// class BankBalanceStore extends Store {
//     getState() {
//         return balance;
//     }
//     __onDispatch(action) {
//         switch (action.type) {
//             case bankConstants.CREATED_ACCOUNT:
//                 balance = 0;
//                 this.__emitChange();
//                 break;
//             case bankConstants.DEPOSITED_INTO_ACCOUNT:
//                 balance = balance + action.ammount;
//                 this.__emitChange();
//                 break;
//             case bankConstants.WITHDREW_FROM_ACCOUNT:
//                 balance = balance - action.ammount;
//                 this.__emitChange();
//                 break;
//         }
//     }
// }
// export default new BankBalanceStore(AppDispatcher);


// implementation with ReduceStore
class BankBalanceStore extends ReduceStore {
    getInitialState() {
        return 0;
    }
    reduce(state, action) {
        switch (action.type) {
            case bankConstants.CREATED_ACCOUNT:
                return 0;
            case bankConstants.DEPOSITED_INTO_ACCOUNT:
                return state + action.ammount;
            case bankConstants.WITHDREW_FROM_ACCOUNT:
                return state - action.ammount;
            default:
                return state;
        }
    }
}
export default new BankBalanceStore(AppDispatcher);