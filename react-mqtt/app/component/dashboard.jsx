import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Widget from "./Widget";

class Dashboard extends Component {

    static propTypes = {
        widgets: PropTypes.arrayOf(PropTypes.shape({
                        id: PropTypes.string.isRequired,
                        name: PropTypes.string.isRequired,
                        type: PropTypes.string.isRequired,
                        switchStatus: PropTypes.string
                })).isRequired,
    }

    render() {
        return (
            <div>
                {this.props.widgets.map(widget =>
                    <Widget key={widget.id} widget={widget} >
                    </Widget>
                )}
            </div>
        )
    }

}

export default Dashboard