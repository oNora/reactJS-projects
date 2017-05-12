import { combineReducers } from 'redux';

import allArticles from './articles';
import singleArticleComments from './singleArticleComments';

const reducers = {
    allArticles,
    singleArticleComments
};

const reducer = combineReducers(reducers);

export default reducer;