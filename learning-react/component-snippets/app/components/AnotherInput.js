var React = require('react');

var AnotherInput = React.createClass({
  handleClick: function() {
    // Explicitly focus the text input using the raw DOM API.
    if (this.myTextInput !== null) {
      this.refs.myTextInput.focus();
    }
  },
  render: function() {
    return (
      <div>
        <input type="text" ref="myTextInput" /
        <input
          type="button"
          value="Focus the text input"
          onClick={this.handleClick}
        />
      </div>
    );
  }
});

module.exports = AnotherInput;
