import React, { Component, PropTypes } from 'react';
import { render } from 'react-dom';
import SearchBar from './SearchBar.jsx'
import ContactList from './ContactList.jsx'
// Main component. Renders a SearchBar and a ContactList
class ContactsApp extends Component {
  constructor(){
    super();
    this.state={
      filterText: ''
    };

    this.handleUserInput = this.handleUserInput.bind(this);
  }
  handleUserInput(searchTerm){
    this.setState({filterText:searchTerm});
  }
  render(){
    return(
      <div>
      <SearchBar filterText={this.state.filterText}
                  onUserInput={this.handleUserInput}/>
      <ContactList contacts={this.props.contacts} 
                  filterText={this.state.filterText}/>
      </div>
    )
  }
}
ContactsApp.propTypes = {
  contacts: PropTypes.arrayOf(PropTypes.object)
}

export default ContactsApp;