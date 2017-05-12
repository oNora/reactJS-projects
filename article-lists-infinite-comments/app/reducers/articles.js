import update from 'immutability-helper';
import {
    GET_ARTICLES_SUCCESSES, GET_MORE_ARTICLES_SUCCESSES, GET_ARTICLES_FAILED, GET_MORE_ARTICLES_FAILED
} from '../constants/constants';

const INITIAL_STATE = { articles: [], error: {} };

const allArticles = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case GET_ARTICLES_SUCCESSES :
            return update(state, { articles: { $set: action.articles } });
        case GET_MORE_ARTICLES_SUCCESSES :
            const copy = state.articles.slice();
            const contactArticles = copy.concat(action.articles);
            return update(state, { articles: {$set: contactArticles} });
        case GET_ARTICLES_FAILED :
            return update(state, { error: { $set: action.error } });
        case GET_MORE_ARTICLES_FAILED :
            return update(state, { error: { $set: action.error } });
        default:
            return state;
    }
};

export default allArticles;