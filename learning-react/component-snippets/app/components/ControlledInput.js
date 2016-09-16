var React = require('react');
// var ReactDOM = require('react-dom');

var ControlledInput = React.createClass({
    getInitialState: function() {
        return {value: 'Hello!'};
    },
    handleChange: function(event) {
        this.setState({value: event.target.value});
        // console.log(this.state);
        // console.log('event.target.value: ', event.target.value);
    },
    componentDidUpdate: function(){
        console.log(this.state);
    },
    render: function() {
        return (
        <input
            ref={function(input) {
                if (input != null) {
                    input.focus();
                }
            }}
            type="text"
            value={this.state.value}
            onChange={this.handleChange}
        />
        );
    }
});

module.exports = ControlledInput;