var scrollmagic = require( 'scrollmagic');

// import GSAP from 'gsap-react-plugin';
var React = require('react');
var ReactDOM = require('react-dom');
// var divStyle = {
//     width: '100px',
//     height: '100px',
//     background: 'yellow'
// }

var Scrollmagic = React.createClass({
    componentDidMount: function(){
        var controller = new scrollmagic.Controller({
            globalSceneOptions: {
                triggerHook: 'onLeave'
            }
        });

        // get all slides
        // var note = this.getDOMNode();
        var note = ReactDOM.findDOMNode(this);
        console.log('this.refs: ', this.refs);
        var sections = this.refs;
        // console.log('sections: ', sections.length);
        // console.log('note.length: ', note.length);
        // console.log('note querySelectorAll: ', querySelectorAll("section.panel"));
        // console.log('this: ',this);
        // console.log('React.findDOMNode(this): ',ReactDOM.findDOMNode(this));
        // var slides = document.querySelectorAll("section.panel");

        // create scene for every slide
        // for (var i=0; i<sections.length; i++) {
        //     console.log('sections[i]: ', sections[i]);
        //     // new scrollmagic.Scene({
        //     //         triggerElement: note[i]
        //     //     })
        //     //     .setPin(note[i])
        //     //     // .addIndicators() // add indicators (requires plugin)
        //     //     .addTo(controller);
        // }
        for (var key in sections) {
            console.log('sections[key]: ', sections[key]);
        }
    },
    render: function(){
        return (
            // <div className={"magicDiv"} style={divStyle}></div>
            <div >
                <h2>scroll magic test</h2>
                <ul id="menu"></ul>
                <div id="content-wrapper">
                    <div id="example-wrapper">
                    <div className="scrollContent">
                        <section id="titlechart">
                        <div id="description">
                            <h1>Scroll Magic + Aurelia</h1>
                            <h3>This page has the same content as this <a href="http://janpaepke.github.io/ScrollMagic/examples/basic/section_wipes_natural.html">Scrollmagic example</a></h3>
                        </div>
                        </section>
                        <section className="demo" id="section-wipes">
                        <section className="panels blue">
                    <b>ONE</b>
                </section>
                <section className="panels turqoise" ref="turqoise">
                    <b>TWO</b>
                </section>
                <section className="panels green" ref="green">
                    <b>THREE</b>
                </section>
                <section className="panels bordeaux" ref="bordeaux">
                    <b>FOUR</b>
                </section>
                        </section>
                    </div>
                    </div>
                </div>
            
            </div>
        )
    }
});

module.exports = Scrollmagic;