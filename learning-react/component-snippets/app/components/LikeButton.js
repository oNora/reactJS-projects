var React = require('react');

class LikeButton extends React.Component {
    constructor() {
        super();
        this.state = {
        liked: false
        };
        this.handleClick = this.handleClick.bind(this);
    }
    handleClick() {
        this.setState({liked: !this.state.liked});
    }
    render() {
        const text = this.state.liked ? 'liked' : 'haven\'t liked';
        return (
        <div onClick={this.handleClick}>
            You {text} this. Click to toggle.
        </div>
        );
    }
}

module.exports = LikeButton;