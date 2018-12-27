import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { getWidgets, addMoreWidgets, widgetClickSwitch } from '../actions/widgets.js';

import Dashboard from "./dashboard";

class Home extends Component {

    //mix es6 and es7 syntax - propTypes to be on the top on competent
    static propTypes = {
        addMoreWidgets: PropTypes.func.isRequired,
        widgets       : PropTypes.arrayOf(PropTypes.shape({
                                id: PropTypes.string.isRequired,
                                name: PropTypes.string.isRequired,
                                type: PropTypes.string.isRequired,
                                switchStatus: PropTypes.string
                        })).isRequired,
        getWidgets    : PropTypes.func.isRequired,
    }

    constructor(props) {
        super(props);

    }

    componentDidMount() {
        this.props.getWidgets();
    }

    render() {
        return (
            <div>
                <h1>
                    Hello , add demo widget &nbsp;
                    <button  onClick={this.props.addMoreWidgets}>+</button>
                </h1>
                <Dashboard widgets={this.props.widgets}/>
            </div>
        );
    }
}

const mapStateToProps = (state, ownProps) => (
    {
        widgets: state.allWidgets.widgets,
    }
);

const mapDispatchToProps = (dispatch) => (
    {
        getWidgets        : () => dispatch(getWidgets()),
        addMoreWidgets    : () => dispatch(addMoreWidgets())
    }
);

export default connect(mapStateToProps, mapDispatchToProps)(Home);