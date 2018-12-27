import mqtt from 'mqtt';
import {
    SUBSCRIPTION_SUCCESS, DISCONNECT, RECONNECT, SUBSCRIPTION_ERROR, MQTT_OFFLINE
} from "../constants/api"

const options = {
    'reconnectPeriod': 60,
    'clientId': 'clientid_' + Math.floor(Math.random() * 65535),
    // 'ssl' : true
    // 'clientId': 'clientId-ZgTEuEEwdd',
    // 'username': this.config.user,
    // 'password': this.config.pass
};


const host = 'ws://broker.mqttdashboard.com:8000/mqtt';
export const mqttClient = mqtt.connect(host, options);
// export const mqttClient = mqtt.connect(host, options);

function invert(obj) {
    const keys = Object.keys(obj);
    const newObj = {};

    keys.forEach(key => {
        newObj[obj[key]] = key;
    });

    return newObj;
}

let topicActionMap = [];

//collect all subscripted messages
export function mapAction(actions) {
    let actionObject = invert(actions);
    var newProp = Object.keys(actions);

    if (topicActionMap.length === 0) {
        topicActionMap.push(actionObject);
    }
    for (var i = 0; i < topicActionMap.length; i++) {
        if (topicActionMap[i].hasOwnProperty(actions[newProp])) {
            return;
        } else {
            topicActionMap.push(actionObject);
            return;
        }

    }
}

export function createMqttClient(store) {

    mqttClient.on('connect', function () {
        store.dispatch({ type: SUBSCRIPTION_SUCCESS });
        mqttClient.subscribe("widget/#");
        mqttClient.subscribe("app/#");
        mqttClient.publish('app/connected', 'true');
    });


    mqttClient.on('message', (topic, payload) => {
        console.log('on message payload =========================>: ', payload.toString());
        let currentAction = topicActionMap.find(topicActionObject => {
            var prop = Object.keys(topicActionObject);
            if (prop[0] === topic) {
                return topicActionObject
            }
        })

        // call appropriate store for each subscripted messages
        if (currentAction && currentAction[topic]) {
            store.dispatch({
                type: currentAction[topic],
                payload: payload.toString(),
                topic: topic,
            });
        }
    });

    mqttClient.on('reconnect', () => {
        console.log('MQTT trying reconnect =========================>');
        store.dispatch({ type: RECONNECT });
        mqttClient.publish('app/connected', 'reconnect');
    });

    mqttClient.on('close', () => {
        console.log('MQTT_DISCONNECT =============>');
        store.dispatch({ type: DISCONNECT });
        mqttClient.publish('app/connected', 'close');
    });

    mqttClient.on('error', err => {
        console.log(`MQTT_ERROR =============> ${err.toString()}`);
        store.dispatch({ type: SUBSCRIPTION_ERROR, error: err, });
        mqttClient.publish('app/connected', 'error');
    });

    mqttClient.on('offline', () => {
        console.log('MQTT_OFFLINE =============>');
        store.dispatch({ type: MQTT_OFFLINE });
        mqttClient.publish('app/connected', 'offline');
    });

}