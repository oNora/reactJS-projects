import { 
    REQUEST_BOOKMARKS, 
    RECEIVE_BOOKMARKS, 
    BOOKMARK_FOR_EDIT, 
    EDIT_COMPONENT_STATE,
    UPDATE_DRAFT,
    CLEAR_DRAFT,
    DELETE_BOOKMARK,
    ADD_BOOKMARK,
    EDIT_BOOKMARK
} from '../constants/constants';
import BookmarkAPI from '../api/bookmarksApi';

let BookmarkActionsCreator = {

    loadBookmarks(dispatch){
        BookmarkAPI.fetchBookmarks().then(
                (bookmarks) => {
                    return dispatch({ type: RECEIVE_BOOKMARKS, success: true, bookmarks })
            },
                (error) => dispatch({ type: RECEIVE_BOOKMARKS, success: false })
            );
    },

   fetchBookmarks() {
        return (dispatch) => {
            dispatch({ type: REQUEST_BOOKMARKS });
            BookmarkActionsCreator.loadBookmarks(dispatch);
        };
    },

    deleteBookmarks(bookmark){
        return (dispatch) => {
            BookmarkAPI.deleteBookmark(bookmark).then(
                () => dispatch({ type: DELETE_BOOKMARK, success: true, bookmark }),
                (error) => dispatch({ type: DELETE_BOOKMARK, success:false, bookmark, error})
            )
        };
    },

    addBookmark(bookmark){
        return (dispatch) => {
            BookmarkAPI.addBookmark(bookmark).then(
                (receivedNewBookmark) =>  dispatch({ type: ADD_BOOKMARK, success:true}),
                (error) => dispatch({ type: ADD_BOOKMARK, success:false })
            )
            .then(()=>{
                 BookmarkActionsCreator.loadBookmarks(dispatch);
            })
        };
    },

    editBookmark(bookmark){
        return (dispatch) => {
            BookmarkAPI.editBookmark(bookmark).then(
                (receivedNewBookmark) => {
                    return dispatch({ type: EDIT_BOOKMARK, success:true, bookmark})
                },
                (error) => dispatch({ type: EDIT_BOOKMARK, success:false, bookmark })
            )
        };
    },

    bookmarkForEdit(selectedBookmark){
         return (dispatch) => {
            dispatch({ type: BOOKMARK_FOR_EDIT, selectedBookmark});
         }
    },

    getEditComponentState(){
        return (dispatch) => {
            dispatch({ type: EDIT_COMPONENT_STATE, selectedBookmark});
         }
    },

    updateDraft(field, value){
        return { type: UPDATE_DRAFT, field, value };
    },

    clearDraft(){
        return { type: CLEAR_DRAFT };
    },

};
export default BookmarkActionsCreator;