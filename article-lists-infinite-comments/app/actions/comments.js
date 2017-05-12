import * as api from '../fakeApi/index.js';
import {
    REQUEST_COMMENTS_SUCCESSES, GET_COMMENTS_SUCCESSES, GET_COMMENTS_FAILED,
    GET_REPLIES_SUCCESSES, GET_REPLIES_FAILED, TOGGLE_REPLIES,
    ADD_COMMENT_SUCCESS, ADD_COMMENT_FAILED,
    TOGGLE_REPLY_FORM,
    ADD_REPLY_SUCCESS, ADD_REPLY_FAILED
} from '../constants/constants';

export function loadComments (id){
    return function (dispatch) {
        dispatch({ type: REQUEST_COMMENTS_SUCCESSES });
        const IdToNumber = parseInt(id);
        api.loadComments( { articleId: IdToNumber } ).then((result) => {
            dispatch({ type: GET_COMMENTS_SUCCESSES, comments: result.data });
        }).catch((error) => {
            dispatch({ type: GET_COMMENTS_FAILED, error: error });
        });
    }
}

export function loadReplies (id){
    return function (dispatch) {
        api.loadComments( { parentCommentId: id } ).then((result) => {
            dispatch({ type: GET_REPLIES_SUCCESSES, replies: result.data, commentId: id });
        }).catch((error) => {
            dispatch({ type: GET_REPLIES_FAILED, error: error });
        });
    }
}

export function toggleReplies (id){
    return function (dispatch) {
         dispatch({ type: TOGGLE_REPLIES, commentId: id });
    }
}

export function toggleReplyForm (id){
    return function (dispatch) {
         dispatch({ type: TOGGLE_REPLY_FORM, commentId: id });
    }
}

export function addComment ({articleId, text}){
    return function (dispatch) {
        api.addComment( {articleId, text} ).then((result) => {
            dispatch({ type: ADD_COMMENT_SUCCESS, newComment: result.data, });
        }).catch((error) => {
            dispatch({ type: ADD_COMMENT_FAILED, error: error });
        });
    }
}

export function addReply ({parentCommentId, text}){
    return function (dispatch) {
        api.addComment( {parentCommentId, text} ).then((result) => {
            dispatch({ type: ADD_REPLY_SUCCESS, reply: result.data, parentCommentId: parentCommentId });
        }).catch((error) => {
            dispatch({ type: ADD_REPLY_FAILED, error: error });
        });
    }
}