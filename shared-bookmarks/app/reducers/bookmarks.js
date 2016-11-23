import { 
    RECEIVE_BOOKMARKS,
    REQUEST_BOOKMARKS,
    DELETE_BOOKMARK,
    ADD_BOOKMARK,
    EDIT_BOOKMARK
} from '../constants/constants';

let bookmarkIndex;

const bookmarks = (state = {}, action) => {
    switch (action.type) {
        case REQUEST_BOOKMARKS:
            return {};
        case RECEIVE_BOOKMARKS:
            return action.bookmarks;

        case DELETE_BOOKMARK:
            if(action.success){
                let newState = Object.assign({}, state);
                delete newState[action.bookmark.id];
                return  newState;
            }
            return  state;

        case ADD_BOOKMARK:
             return  state;

        case EDIT_BOOKMARK:
            if(action.success){
                let newState = Object.assign({}, state);
                newState[action.bookmark.id].title = action.bookmark.title;
                newState[action.bookmark.id].url = action.bookmark.url;
                return newState;
            }
            return  state;

        default:
            return state;
    }
};

export default bookmarks;

export const getBookmarkIndex = (state, id) => state.findIndex((bookmark)=>bookmark.id == id);