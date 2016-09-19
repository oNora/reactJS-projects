var TweenMax = require( 'gsap');
var Power4 = require( 'gsap');

var React = require('react');

var divStyle = {
    width: '100px',
    height: '100px',
    background: 'red'
}

var ease = Power4.easeInOut;

var Box = React.createClass({
    componentDidMount: function(){
        var note= this.getDOMNode();
        TweenMax.to(note, 5, {
            x:299,
            ease: ease,
        });
    },
    render: function(){
        return (
            <div className={"box"} style={divStyle}></div>
        )
    }
});

module.exports = Box;