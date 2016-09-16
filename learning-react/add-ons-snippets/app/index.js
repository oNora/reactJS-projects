var React = require('react');
var ReactDOM = require('react-dom');

var AnimatedList = require('./components/AnimatedList');
var CloneElement = require('./components/CloneElement');

require('./css/styles.css');


var HelloWorld = React.createClass({
    render: function() {

        return (
        <div>
            <p  data-custom-attribute="foo">
                Hello, <input type="text" placeholder="Your name here"  />!
                It is {this.props.date.toTimeString()}
                <br/>
            </p>
            <br/>
            <AnimatedList/>
            <br/>
            <CloneElement/>
        </div>

        );
    }
});


ReactDOM.render(
    <HelloWorld date={new Date()} />,
    document.getElementById('example')
);



