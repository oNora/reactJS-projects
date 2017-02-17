import 'whatwg-fetch';
import AirportActionCreators from '../actions/AirportActionCreators';

let AirCheapAPI = {
    fetchAirports() {
        fetch('airports.json')
            .then((response) => {
                return response.json()
            })
            .then((responseData) => {
                // Call the AirportActionCreators success action with the parsed data
                AirportActionCreators.fetchAirportsSuccess(responseData);
            })
            .catch((error) => {
                // Call the AirportActionCreators error action with the error object
                AirportActionCreators.fetchAirportsError(error);
            });
    },

    fetchTickets(origin, destination) {
        fetch('flights.json')
            .then((response) => response.json())
            .then((responseData) => {
                AirportActionCreators.fetchTicketsSuccess(responseData);
            })
            .catch((error) => {
                AirportActionCreators.fetchTicketsError(error);
            });
    }
};

export default AirCheapAPI;