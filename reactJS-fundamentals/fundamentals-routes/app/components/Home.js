var React = require('react');
var ReactRouter = require('react-router');
var Link = ReactRouter.Link;

var Home = React.createClass({
    render: function() {
        return (
            <div>
                Hallo from Home!
                <br />
                Go to <Link to='/page'>InnerPage</Link>
            </div>
        )
    }
});

module.exports = Home;