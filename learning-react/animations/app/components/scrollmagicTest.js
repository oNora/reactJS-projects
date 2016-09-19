var scrollmagic = require( 'scrollmagic/ScrollMagic');

require('scrollmagic/plugins/debug.addIndicators.js');

var React = require('react');
var ReactDOM = require('react-dom');

var Scrollmagic = React.createClass({
    componentDidMount: function(){
        this.controller = new scrollmagic.Controller({
            globalSceneOptions: {
                triggerHook: 'onLeave'
            }
        });

        var sections = this.refs;

        for (var key in sections) {
            var note = ReactDOM.findDOMNode(sections[key]);

            new scrollmagic.Scene({
                    triggerElement: sections[key]
                })
                .setPin(sections[key])
                .addIndicators() // add indicators (requires plugin)
                .addTo(this.controller);
        }
    },
    render: function(){
        return (
            // <div className={"magicDiv"} style={divStyle}></div>
            <div className="page-host">
                <h2>scroll magic test</h2>
                <ul id="menu"></ul>
                <div id="content-wrapper">
                    <div id="example-wrapper">
                    <div className="scrollContent">
                        <section id="titlechart">
                        <div id="description">
                            <h1>Scroll Magic + React</h1>
                            <h3>This page has the same content as this <a href="http://janpaepke.github.io/ScrollMagic/examples/basic/section_wipes_natural.html">Scrollmagic example</a></h3>
                        </div>
                        </section>
                        <section className="demo" id="section-wipes">
                        <section className="panels blue" ref="blue">
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