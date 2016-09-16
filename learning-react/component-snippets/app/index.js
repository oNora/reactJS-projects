var React = require('react');
var ReactDOM = require('react-dom');

var ControlledInput = require('./components/ControlledInput');
var LikeButton = require('./components/LikeButton');
var CheckLink = require('./components/CheckLink');
var TickTock = require('./components/TickTock');
var AnotherInput = require('./components/AnotherInput');

var props = {};
props.foo = 5;
props.bar = 3;

var HelloWorld = React.createClass({
    render: function() {
        //console.log(this.props);
        return (
        <div>
            <p  data-custom-attribute="foo">
                Hello, <input type="text" placeholder="Your name here"  />!
                It is {this.props.date.toTimeString()}
                <br/>  {this.props.bar}
                <br/>  {this.props.foo}
                <br/>

            </p>
            <LikeButton />
            <br/>
            <CheckLink href="/checked.html">
                Click here!
            </CheckLink>
            <br/>
            <TickTock />
            <br/>
            <ControlledInput/>
            <br/>
            <br/>
            <AnotherInput />
        </div>

        );
    }
});


// setInterval(function() {
    ReactDOM.render(
        <HelloWorld date={new Date()} {...props}/>,
        document.getElementById('example')
    );
// }, 500);


