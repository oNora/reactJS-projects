var React = require('react');
var ReactDOM = require('react-dom');

var USER_DATA ={
    name: 'Eleonora',
    username: 'oNora',
    image: 'https://avatars1.githubusercontent.com/u/4469882?v=3&s=460'
};

var ProfilePic = React.createClass({
    render: function() {
        return (
            <img src={this.props.image} style={{height: 100, width:100}} />
        )
    }
});

var Link = React.createClass({
    changeUrl: function () {
      window.location.replace(this.props.href);
    },
    render: function() {
        return(
            <span
                style={{color: 'blue', cursor: 'pointer'}}
                onClick={this.changeUrl}>
                    {this.props.children}
            </span>
        )
    }
});

var ProfileLink = React.createClass({
    render: function() {
        return (
            <Link href={'https://github.com/' + this.props.username}>
                {this.props.username}
            </Link>
        )
    }
});

var ProfileName = React.createClass({
    render: function() {
        return (
            <div> {this.props.name} </div>
        )
    }
});

var Avatar = React.createClass({
    render: function() {
        return (
            <div>
                <ProfilePic image={this.props.user.image} />
                <ProfileName name={this.props.user.name} />
                <ProfileLink username={this.props.user.username} />
            </div>
        )
    }
});

ReactDOM.render(<Avatar user={USER_DATA} />, document.getElementById('app'));