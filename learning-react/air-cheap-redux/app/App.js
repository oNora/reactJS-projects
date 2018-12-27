import React, { Component, PropTypes } from 'react';
import { render } from 'react-dom';
import { Provider, connect } from 'react-redux';
import aircheapStore from './stores/AirCheapStore';
import Select from 'react-select';
import AirportActionCreators from './actions/AirportActionCreators';
import TicketItem from './components/TicketItem';

class App extends Component {

  componentDidMount(){
    this.props.fetchAirports();
  }

  componentWillUpdate(nextProps, nextState){
    console.log('nextProps: ', nextProps);
    console.log('nextState: ', nextState);
    console.log('this.props: ', this.props);
    let originAndDestinationSelected = nextProps.origin && nextProps.destination;
    let selectionHasChangedSinceLastUpdate = nextProps.origin !== this.props.origin ||
                                             nextProps.destination !== this.props.destination;
    if(originAndDestinationSelected && selectionHasChangedSinceLastUpdate){
      this.props.fetchTickets(nextProps.origin, nextProps.destination);
    }
  }

  render() {
    let ticketList = this.props.tickets.map((ticket)=>(
      <TicketItem key={ticket.id} ticket={ticket} />
    ));
    return (
      <div>
        <header>
          <div className="header-brand">
            <img src="logo.png" height="35"/>
            <p>Check discount ticket prices and pay using your AirCheap points</p>
          </div>
          <div className="header-route">

           <Select
               name="origin"
               value={this.props.origin}
               options={this.props.airports}
               onChange={this.props.onChooseAirport.bind(this,'origin')}
           />

          <Select
               name="destination"
               value={this.props.destination}
               options={this.props.airports}
               onChange={this.props.onChooseAirport.bind(this,'destination')}
           />

          </div>

        </header>
        <div>
          { ticketList }
        </div>
      </div>
    );
  }
}
App.propTypes = {
  airports: PropTypes.array.isRequired,
  origin: PropTypes.string,
  destination: PropTypes.string,
  tickets: PropTypes.array.isRequired,
  fetchAirports: PropTypes.func.isRequired,
  onChooseAirport: PropTypes.func.isRequired,
  fetchTickets: PropTypes.func.isRequired,
};


const mapStateToProps = (state) => (
  {
    airports: state.airports
      .map(airport => ({ value: airport.code, label: `${airport.city} - ${airport.country} (${airport.code})` })),
    origin: state.route.origin,
    destination: state.route.destination,
    tickets: state.tickets,
  }
);

const mapDispatchToProps = (dispatch) => (
  {
    fetchAirports: () => dispatch(AirportActionCreators.fetchAirports()),
    onChooseAirport: (target, airport) => dispatch(AirportActionCreators.chooseAirport(target, airport)),
    fetchTickets: (origin, destination) => dispatch(AirportActionCreators.fetchTickets(origin, destination))
  }
);

const AppContainer = connect(mapStateToProps, mapDispatchToProps)(App);

render(
  <Provider store={aircheapStore}>
    <AppContainer />
  </Provider>,
  document.getElementById('root')
);
