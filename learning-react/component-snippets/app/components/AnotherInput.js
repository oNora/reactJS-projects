var React = require('react');

var AnotherInput = React.createClass({
  handleClick: function() {
    // Explicitly focus the text input using the raw DOM API.
    if (this.myTextInput !== null) {
      this.myTextInput.focus();
    }
  },
  render: function() {
    // The ref attribute is a callback that saves a reference to the
    // component to this.myTextInput when the component is mounted.
    return (
      <div>
        <input type="text" ref={(ref) => this.myTextInput = ref} />
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