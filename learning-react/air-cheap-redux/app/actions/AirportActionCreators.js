import {  REQUEST_AIRPORTS, RECEIVE_AIRPORTS, CHOOSE_AIRPORT, REQUEST_TICKETS, RECEIVE_TICKETS } from '../constants/constants'
import AirCheapAPI from '../api/AirCheapApi';

let AirportActionCreators = {
    // Thunk Action creator
    fetchAirports(origin, destination) {
        return (dispatch) => {
            dispatch({ type: REQUEST_AIRPORTS });
            AirCheapAPI.fetchAirports().then(
                (airports) => dispatch({ type: RECEIVE_AIRPORTS, success: true, airports }),
                (error) => dispatch({ type: RECEIVE_AIRPORTS, success: false })
            );
        };
    },
    // Regular Action creator
    chooseAirport(target, airport) {
        return {
            type: CHOOSE_AIRPORT,
            target: target,
            code: airport ? airport.value : ''
        }
    },

    fetchTickets(origin, destination) {
        console.log('fech ticket');
        return (dispatch) => {
        dispatch({ type: REQUEST_TICKETS });
        AirCheapAPI.fetchTickets(origin, destination).then(
            (tickets) => dispatch({ type: RECEIVE_TICKETS, success: true, tickets }),
            (error) => dispatch({ type: RECEIVE_TICKETS, success: false })
        );
        }
    }
};
export default AirportActionCreators;