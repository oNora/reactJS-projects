import React from 'react';
import { render } from 'react-dom';
import { Router, Route, hashHistory } from 'react-router';

import { Provider } from 'react-redux';
import appStore from './store/AppStore.js';

import './index.scss';

import HomeGrid from './components/HomeGrid';
import ArticleViewContainer from './components/article/articleViewContainer';

render((
    <Provider store={appStore}>
        <Router history={hashHistory}>
                <Route  path="/" component={HomeGrid} >
                    <Route path="articles/:articleId" component={ArticleViewContainer} />
                </Route>
        </Router>
    </Provider>
),
    document.getElementById('root')
);