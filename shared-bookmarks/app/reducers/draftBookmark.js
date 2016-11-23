import { BOOKMARK_FOR_EDIT, UPDATE_DRAFT, CLEAR_DRAFT } from '../constants/constants';
import update from 'react-addons-update';

const defaultDraftBookmark = () => {
  return {
    id: '',
    title:'',
    url:''
  }
};

const draftBookmark = (state = defaultDraftBookmark(), action) => {
    switch (action.type) {
        case BOOKMARK_FOR_EDIT:
            return action.selectedBookmark;
        case UPDATE_DRAFT:
            return update(state, {
                [action.field]: {
                    $set: action.value
                }
            });
        case CLEAR_DRAFT:
            return defaultDraftBookmark();
        default:
            return state;
    }
};

export default draftBookmark;