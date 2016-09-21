var React = require('react');
var ReactDOM = require('react-dom');

var HelloWorld = require('./components/helloWorld');

var MainCont = React.createClass({
    render: function() {
        return (
        <div>
            <p  data-custom-attribute="foo">
                Hello, <input type="text" placeholder="Your name here"  />!
                It is {this.props.date.toTimeString()}
                <br/>
            </p>
            <HelloWorld/>
            <h1>main test</h1>
        </div>
        );
    }
});


ReactDOM.render(
    <MainCont date={new Date()}/>,
    document.getElementById('example')
);