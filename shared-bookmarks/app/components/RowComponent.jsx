import React, {Component, PropTypes} from 'react';

class RowComponent extends Component {
    render() {

        return (
                <tr >
                     <td><a href={this.props.bookmark.url}>{this.props.bookmark.title}</a></td>
                     <td>{this.props.bookmark.url}</td>
                     <td>
                         <button onClick={this.props.onEdit}> Edit </button>
                         <button onClick={this.props.onDelete}> Delete </button>
                     </td>
                </tr>

        );
    }
}

RowComponent.propTypes = {
    bookmark: PropTypes.object
}

export default RowComponent;