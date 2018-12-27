import React, { Component } from 'react';
import PropTypes from 'prop-types';

class SwitchBtn extends Component {

    static propTypes = {
        switchStatus: PropTypes.string.isRequired,
        switchClick: PropTypes.func.isRequired
    }

    constructor(props) {
        super(props);

        this.handleClick = this.handleClick.bind(this)

    }

    handleClick() {
        this.props.switchClick();
    }

    render() {

        var isChecked = this.props.switchStatus === 'on' ? true : false;

        return (

                <label className="switch">
                    <input type="checkbox" checked={isChecked} onClick={this.handleClick} />
                    <span className="slider round"></span>
                </label>

        )
    }

}

export default SwitchBtn