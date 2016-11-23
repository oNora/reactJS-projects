import React, { Component, PropTypes } from 'react';
import { render } from 'react-dom';

import { Provider, connect } from 'react-redux';
import bookmarksStore from './store/BookmarksStore';
import BookmarkActionsCreator from './actions/BookmarkActionsCreator'

import Table from './components/TableComponent';
import EditComponent from './components/EditComponent.jsx';

import AppContainer from './components/AppContainer.jsx';

render(
  <Provider store={bookmarksStore}>
    <AppContainer />
  </Provider>,
  document.getElementById('root')
);