import React, { Component, PropTypes } from 'react';
// import { render } from 'react-dom';

import { Provider, connect } from 'react-redux';
// import bookmarksStore from '../store/BookmarksStore';
import BookmarkActionsCreator from '../actions/BookmarkActionsCreator'

import Table from './TableComponent';
import EditComponent from './EditComponent.jsx';


class AppContainer extends Component{
    constructor() {
        super();

        this.onDelete = this.onDelete.bind(this);
        this.onBookmarksEdit = this.onBookmarksEdit.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.clearField = this.clearField.bind(this);
        this.reload = this.reload.bind(this);
    }
    componentDidMount(){
        this.props.fetchBookmarks();
    }

    onBookmarksEdit(selectedBookmark){
        this.props.bookmarkForEdit(selectedBookmark);
    }

    handleSubmit(e){
        console.log('selectedBookmark state: ', this.props.selectedBookmark);

         let newState = Object.assign({}, this.props.selectedBookmark);
         delete newState.id;
        if( this.props.selectedBookmark.id !== ""){
            console.log('not empty');
            this.props.editBookmark(this.props.selectedBookmark);
        }else{
            console.log('empty');
            this.props.addBookmark(newState);
        }
        this.props.clearDraft();
        e.preventDefault();
    }

    handleChange(field, value){
        this.props.updateDraft(field, value);
    }

    clearField(){
        this.props.clearDraft();
    }

    onDelete(bookmark){
        this.props.deleteBookmark(bookmark);
    }

    reload(){
        console.log('reload');
        this.props.fetchBookmarks();
    }

    render() {
        return (
        <div>
           <EditComponent 
                selectedBookmark={this.props.selectedBookmark} 
                handleSubmit={this.handleSubmit}
                handleChange={this.handleChange}
                clearField={this.clearField}
                />
           < Table 
                bookmarks={this.props.bookmarks}
                onEdit={this.onBookmarksEdit}
                onDelete={this.onDelete}/>
        </div>
        );
    }
};

AppContainer.propTypes = {
    bookmarks: PropTypes.object,
    fetchBookmarks: PropTypes.func,
    bookmarkForEdit: PropTypes.func,
    selectedBookmark: PropTypes.object,
    updateDraft: PropTypes.func,
    clearDraft: PropTypes.func,
    deleteBookmark: PropTypes.func,
    addBookmark: PropTypes.func,
    editBookmark: PropTypes.func
}

const mapStateToProps = (state) => (
  {
    bookmarks: state.bookmarks,
    selectedBookmark: state.draftBookmark
  }
);

const mapDispatchToProps = (dispatch) => (
  {
    fetchBookmarks: () => dispatch(BookmarkActionsCreator.fetchBookmarks()),
    bookmarkForEdit: (selectedBookmark) => dispatch(BookmarkActionsCreator.bookmarkForEdit(selectedBookmark)),
    updateDraft: (field, value) => dispatch(BookmarkActionsCreator.updateDraft(field, value)),
    clearDraft: () => dispatch(BookmarkActionsCreator.clearDraft()),
    deleteBookmark: (bookmark) => dispatch(BookmarkActionsCreator.deleteBookmarks(bookmark)),
    addBookmark: (bookmark) => dispatch(BookmarkActionsCreator.addBookmark(bookmark)),
    editBookmark: (bookmark) => dispatch(BookmarkActionsCreator.editBookmark(bookmark))
  }
);

export default connect(mapStateToProps, mapDispatchToProps)(AppContainer);