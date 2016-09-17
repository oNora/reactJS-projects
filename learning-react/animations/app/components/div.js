var TweenMax = require( 'gsap');

// import GSAP from 'gsap-react-plugin';
var React = require('react');

var divStyle = {
    width: '100px',
    height: '100px',
    background: 'red'
}

var Box = React.createClass({
    componentDidMount: function(){
        var note= this.getDOMNode();
        TweenMax.to(note, 5, {x:299});
    },
    render: function(){
        return (
            <div className={"box"} style={divStyle}></div>
        )
    }
});

module.exports = Box;