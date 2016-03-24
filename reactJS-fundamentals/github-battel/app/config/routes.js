var React = require('react');
var ReactRouter = require('react-router');
var Router = ReactRouter.Router;
var Route = ReactRouter.Route;
var hashHistory = ReactRouter.hashHistory;
var IndexRoute = ReactRouter.IndexRoute;
var Main = require('../components/Main');
var Home = require('../components/Home');
var PromptContainer = require('../containers/PromptContainer');
var ConfirmBattleContainer = require('../containers/ConfirmBattelContainer');
var ResultsContainer = require('../containers/ResultsContainer');

var routes = (
    <Router history={hashHistory}>
        <Route path='/' component={Main}>
            <IndexRoute  component={Home} />
            <Route path='/playerOne' header='Play One' component={PromptContainer} />
            <Route path='/playerTwo/:playerOne' header='Play Two' component={PromptContainer} />
            <Route path='/battle' component={ConfirmBattleContainer} />
            <Route path='/results' component={ResultsContainer} />
        </Route>
    </Router>
);

module.exports = routes;