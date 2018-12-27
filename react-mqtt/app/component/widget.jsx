import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { widgetClickSwitch } from '../actions/widgets.js';

import SwitchBtn from './element/switch-btn';

class Widget extends Component {

    static propTypes = {
        widget: PropTypes.shape({
                id: PropTypes.string.isRequired,
                name: PropTypes.string.isRequired,
                type: PropTypes.string.isRequired,
                switchStatus: PropTypes.string
        }).isRequired,
        widgetClickSwitch: PropTypes.func.isRequired
    }

    constructor(props) {
        super(props);

        this.clickHandler = this.clickHandler.bind(this)
    }

    clickHandler(){
        let newStatus = this.props.widget.switchStatus === 'on' ? 'off' : 'on';
        this.props.widgetClickSwitch(this.props.widget.id, newStatus);
    }

    render() {
        return (
            <div className='widget-block'>
                <p>{this.props.widget.name}</p>

                {this.props.widget.type === 'switch' &&
                    <SwitchBtn switchStatus={this.props.widget.switchStatus} switchClick={this.clickHandler}/>
                }

            </div>
        )
    }

}


const mapStateToProps = (state, ownProps) => (
    { }
);

const mapDispatchToProps = (dispatch) => (
    {
        widgetClickSwitch : (id, switchStatus) => dispatch(widgetClickSwitch(id, switchStatus))
    }
);

export default connect(mapStateToProps, mapDispatchToProps)(Widget);