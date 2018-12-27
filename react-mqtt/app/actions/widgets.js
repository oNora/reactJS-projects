import { mqttClient, mapAction } from "../api/api-config";
import {
    GET_WIDGETS_SUCCESSES, ADD_MORE_WIDGETS_SUCCESSES, GET_WIDGETS_FAILED, ADD_MORE_WIDGETS_FAILED,
    DASHBOARD_WIDGETS, HANDLER_CLICK_SWITCH
} from '../constants/constants';
import { SUBSCRIPTION_SUCCESS } from '../constants/api';

export function getWidgets() {
    return function (dispatch) {
        mqttClient.subscribe(`onDashbord/widgets/`); // subscribt to msg
        mapAction({ DASHBOARD_WIDGETS: `onDashbord/widgets/` }); // prepare action to be map on msg arrive
        dispatch({ type: GET_WIDGETS_SUCCESSES });
    }
}

export function addMoreWidgets() {
    return function (dispatch) {
        mqttClient.publish('test', 'test from app');
        mqttClient.publish('widget/new', 'add new widget');
        dispatch({ type: ADD_MORE_WIDGETS_SUCCESSES });
    }
}

export function widgetClickSwitch(widgetID, newStatus) {
    // mqttClient.publish('test/', 'new test');
    let prepareResponse = {
        "id": widgetID,
        "name": "plug",
        "type": "switch",
        "switchStatus": newStatus
    }
    mqttClient.publish('onDashbord/widgets/', JSON.stringify(prepareResponse));
    return function (dispatch) {
        // dispatch({ type: HANDLER_CLICK_SWITCH, id: widgetID, switchStatus: newStatus}); // does not work only with publish and without this
        dispatch({ type: HANDLER_CLICK_SWITCH }); // trow error if you miss the dispatch
    }
}
