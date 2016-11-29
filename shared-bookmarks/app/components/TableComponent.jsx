import React, {Component, PropTypes} from 'react';

import { connect } from 'react-redux';
import BookmarkActionsCreator from '../actions/BookmarkActionsCreator.js';
import constants from '../constants/constants.js';

import RowComponent from './RowComponent';

class ListComponent extends Component {

    render() {

        function generateTableRows (bookmarks, onEdit, onDelete) {

            let bookmarksArr = [];
            Object.keys(bookmarks).forEach(function(key){
                let bookmark = bookmarks[key];
                bookmark.id = key;
                bookmarksArr.push(bookmarks[key]);
            });
            let tableRow = bookmarksArr.map(function(obj){
                    return ( 
                        < RowComponent key={obj.id} 
                                        bookmark={obj} 
                                        onEdit={onEdit.bind(null, obj)} 
                                        onDelete={onDelete.bind(null, obj)}
                                        />
                    )
            });

            return tableRow;
        }

        return (
            <div className="panel panel-default">
                <table className="table table-striped">
                    <tbody>
                        {generateTableRows(this.props.bookmarks, this.props.onEdit, this.props.onDelete)}
                    </tbody>
                </table>
            </div>
        );
    }
}

ListComponent.propTypes = {
    bookmarks: PropTypes.object,
    bookmarkForEdit: PropTypes.func,
    onDelete: PropTypes.func
}

const mapStateToProps = (state) => ({});

const mapDispatchToProps = (dispatch) => (
  {
    bookmarkForEdit: (currentBookmark) => dispatch(BookmarkActionsCreator.bookmarkForEdit(currentBookmark))
  }
);

export default connect(mapStateToProps, mapDispatchToProps)(ListComponent);