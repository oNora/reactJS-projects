import update from 'immutability-helper';
import {
    GET_WIDGETS_SUCCESSES, ADD_MORE_WIDGETS_SUCCESSES, GET_WIDGETS_FAILED, ADD_MORE_WIDGETS_FAILED,
    DASHBOARD_WIDGETS, HANDLER_CLICK_SWITCH
} from '../constants/constants';
import {
    SUBSCRIPTION_SUCCESS
} from '../constants/api';

let idSimulator = 2;

const INITIAL_STATE = {
    widgets: [
        {
            id: "id-1",
            name: 'plug',
            type: 'switch',
            switchStatus: 'off'
        },
        {
            id: "id-2",
            name: 'motion sensor',
            type: 'text'
        }
    ],
    error: {}
};

const allWidgets = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case GET_WIDGETS_SUCCESSES :
            return state;
        case ADD_MORE_WIDGETS_SUCCESSES :
            idSimulator++;
            const copy = state.widgets.slice();
            const contactWidgets = copy.concat([{
                id: "id-" + idSimulator,
                name: 'new widget',
                type: 'switch',
                switchStatus: 'off'
            }]);
            return update(state, { widgets: {$set: contactWidgets} });
        case DASHBOARD_WIDGETS :
            let convertToJson = JSON.parse(action.payload);
            let widgetIndex = state.widgets.findIndex(x => x.id == convertToJson.id);
            return update(state, {
                widgets: { [widgetIndex] : {switchStatus : {$set: convertToJson.switchStatus} } }
            });
        // case HANDLER_CLICK_SWITCH :
        //     let findeIndex = state.widgets.findIndex(x => x.id == action.id);
        //     return update(state, {
        //         widgets: { [findeIndex] : {switchStatus : {$set: action.switchStatus} } }
        //     });
        default:
            return state;
    }
};

export default allWidgets;