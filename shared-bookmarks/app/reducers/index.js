import { combineReducers } from 'redux';

import bookmarks from './bookmarks';
import draftBookmark from './draftBookmark';

const rootReducer = combineReducers({
    bookmarks,
    draftBookmark
});

export default rootReducer;