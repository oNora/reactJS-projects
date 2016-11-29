import React, {Component, PropTypes} from 'react';


class RowComponent extends Component {
    render() {

        return (
                <tr >
                     <td><a href={this.props.bookmark.url}>{this.props.bookmark.title}</a></td>
                     <td>{this.props.bookmark.url}</td>
                     <td>
                         <button onClick={this.props.onEdit} className="btn btn-primary">
                            <span className="glyphicon glyphicon-pencil"></span>
                            <span className="hidden-xs"> Edit </span>
                         </button>
                         <button onClick={this.props.onDelete} className="btn btn-danger">
                            <span className="glyphicon glyphicon-remove"></span>
                            <span className="hidden-xs"> Delete </span>
                         </button>
                     </td>
                </tr>

        );
    }
}

RowComponent.propTypes = {
    bookmark: PropTypes.object
}

export default RowComponent;