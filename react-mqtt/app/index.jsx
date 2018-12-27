import React, { Component } from 'react';
import { render } from 'react-dom';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'

import { Provider } from 'react-redux';
import appStore from './store/AppStore.js';

import './index.scss';

import Home from './component/home';
import SecondPage from './component/second-page';

render((
    <Provider store={appStore}>
        <Router>
            <div>
                <ul>
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/secondPage">second page</Link></li>
                </ul>

                <hr />

                <Route exact path="/" component={Home} />
                <Route path="/secondPage" component={SecondPage} />
            </div>
        </Router>
    </Provider>
), document.getElementById('root'));