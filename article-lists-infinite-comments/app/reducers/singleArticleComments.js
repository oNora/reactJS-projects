import update from 'immutability-helper';
import {
    REQUEST_COMMENTS_SUCCESSES, GET_COMMENTS_SUCCESSES, GET_COMMENTS_FAILED,
    GET_REPLIES_SUCCESSES, TOGGLE_REPLIES,
    ADD_COMMENT_SUCCESS, ADD_COMMENT_FAILED,
    TOGGLE_REPLY_FORM,
    ADD_REPLY_SUCCESS, ADD_REPLY_FAILED
} from '../constants/constants';

const INITIAL_STATE = { comments: [], error: {}};

function findComment(theObject, commentId, replies, eventName) {

    if (theObject instanceof Array) {
        for(let i = 0; i < theObject.length; i++) {
            findComment(theObject[i], commentId, replies, eventName);
        }
    } else {
        for (let prop in theObject) {
            if (prop ==='id') {
                if (theObject[prop] === commentId) {
                    switch (eventName) {
                        case 'addReply':
                            theObject.replies = theObject.replies ? theObject.replies : [];
                            theObject.replies.unshift(replies);
                            theObject.toggle = true;
                            return theObject;
                        case 'toggleReplyForm':
                            theObject.toggleReplyForm = !theObject.toggleReplyForm;
                            return theObject;
                        case 'loadReplies':
                            theObject.replies = replies;
                            theObject.toggle = true;
                            theObject.toggleReplyForm = false;
                            return theObject;
                        case 'toggleReplies':
                            theObject.toggle = !theObject.toggle;
                            return theObject;
                    }
                }
            }
            if (theObject[prop] instanceof Object || theObject[prop] instanceof Array) {
                findComment(theObject[prop], commentId, replies, eventName);
            }
        }
    }
}

const singleArticleComments = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case REQUEST_COMMENTS_SUCCESSES :
            return update(state, { comments: { $set: [] } });
        case GET_COMMENTS_SUCCESSES :
            return update(state, { comments: { $set: action.comments } });
        case GET_REPLIES_SUCCESSES :
            const newCommentsArr = state.comments.slice();
            findComment(newCommentsArr, action.commentId, action.replies, 'loadReplies');
            return update(state, { comments: { $set: newCommentsArr } } );
        case TOGGLE_REPLIES :
            const copyCommentsArr = state.comments.slice();
            findComment(copyCommentsArr, action.commentId, null, 'toggleReplies');
            return update(state, { comments: { $set: copyCommentsArr } } );
        case TOGGLE_REPLY_FORM :
            const copyArr = state.comments.slice();
            findComment(copyArr, action.commentId, null, 'toggleReplyForm');
            return update(state, { comments: { $set: copyArr } } );
        case ADD_COMMENT_SUCCESS:
            return update(state, { comments: { $unshift: [action.newComment] } } );
        case ADD_REPLY_SUCCESS:
            const copy = state.comments.slice();
            findComment(copy, action.parentCommentId, action.reply, 'addReply');
            return update(state, { comments: { $set: copy } } );
        case GET_COMMENTS_FAILED :
            return update(state, { error: { $set: action.error } });
        case ADD_COMMENT_FAILED :
            return update(state, { error: { $set: action.error } });
        case ADD_REPLY_FAILED :
            return update(state, { error: { $set: action.error } });
        default:
            return state;
    }
};

export default singleArticleComments;