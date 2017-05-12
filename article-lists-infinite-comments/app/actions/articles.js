import * as api from '../fakeApi/index.js';
import {
    GET_ARTICLES_SUCCESSES, GET_MORE_ARTICLES_SUCCESSES, GET_ARTICLES_FAILED, GET_MORE_ARTICLES_FAILED
} from '../constants/constants';

export function loadArticles (){
    return function (dispatch) {
        api.loadArticles( { offset: 0, limit: 4 } ).then((result) => {
            dispatch({ type: GET_ARTICLES_SUCCESSES, articles: result.data });
        }).catch((error) => {
            dispatch({ type: GET_ARTICLES_FAILED, error: error });
        });
    }
}

export function loadMoreArticles (currentArticleLength){
    return function (dispatch) {
        api.loadArticles( { offset: currentArticleLength, limit: 4 } ).then((result) => {
            dispatch({ type: GET_MORE_ARTICLES_SUCCESSES, articles: result.data });
        }).catch((error) => {
            dispatch({ type: GET_MORE_ARTICLES_FAILED, error: error });
        });
    }
}