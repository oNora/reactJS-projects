## React app with MQTT & REDUX:
In this app I am playing with mqtt.

This app is using connection to the [public mqtt broker](http://www.hivemq.com/demos/websocket-client/)

## How to use app:

After installation of all npm dependencies and start the app (`npm start`) visit [the public broker web site](http://www.hivemq.com/demos/websocket-client/) and connect to the broker using the `connect` button.
<br />
Use button `Add New Topic Subscription` to subscribed to following topics:
- subscribed to topic `app/#` - This will show you all messages related to the connection to the MQTT
- subscribed to topic `onDashbord/widgets/#` - this will show you all events when changing switch button in IU
- subscribed to topic `widget/new` - show message when you add a new widget to the dashboard


The app also listen for evens coming from the public broker. How to post message to the app? On the `Publish` section ot the web site of the broker add following:
-  topic `onDashbord/widgets/`
- message:
<pre>
{
    "id": "id-1",
    "name": "plug",
    "type": "switch",
    "switchStatus": "on" // change this to see how UI changing
}
</pre>

What to change in the  message:
- id - this is the id of the widget. When you switch the button of the widget you can see in browser console or if you subscribed on public broker for `onDashbord/widgets/#` topic the id of the current widget
- switchStatus - when you use the public broker to publish a message change this in order to see changes on the UI
