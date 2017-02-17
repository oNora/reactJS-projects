import React, { Component } from 'react';
import {render} from 'react-dom';

import {Container} from 'flux/utils';

import BankBalanceStore from './stores/BankBalanceStore';
import BankActions from './actions/BankActions';
import BankRewardsStore from './stores/BankRewardsStore';

class App extends Component {
  constructor() {
    super(...arguments);
    // implementation without flux Container
    // BankActions.createAccount();
    // this.state = {
    //   balance: BankBalanceStore.getState()
    // }
    BankActions.createAccount();
  }
  // implementation without flux Container
  // componentDidMount() {
  //   this.storeSubscription = BankBalanceStore.addListener(data => this.handleStoreChange(data));
  // }
  // componentWillUnmount() {
  //   this.storeSubscription.remove();
  // }
  // handleStoreChange() {
  //   this.setState({ balance: BankBalanceStore.getState() });
  // }
  deposit() {
    BankActions.depositIntoAccount(Number(this.refs.ammount.value));
    this.refs.ammount.value = '';
  }
  withdraw() {
    BankActions.withdrawFromAccount(Number(this.refs.ammount.value));
    this.refs.ammount.value = '';
  }
  render() {
    return (
      <div>
        <header>FluxTrust Bank</header>
        <h1>Your balance is ${(this.state.balance).toFixed(2)}</h1>
        <h2>Your Points Rewards Tier is {this.state.rewardsTier}</h2>
        <div className="atm">
          <input type="text" placeholder="Enter Ammount" ref="ammount" />
          <br />
          <button onClick={this.withdraw.bind(this)}>Withdraw</button>
          <button onClick={this.deposit.bind(this)}>Deposit</button>
        </div>
      </div>
    );
  }
}

// implementation without flux Container
// render(<App />, document.getElementById('root'));

// implementation WITH flux Container
App.getStores = () => ([BankBalanceStore]);
App.calculateState = (prevState) => ({
  balance: BankBalanceStore.getState(),
  rewardsTier: BankRewardsStore.getState()
});

const AppContainer = Container.create(App);

render(<AppContainer />, document.getElementById('root'));