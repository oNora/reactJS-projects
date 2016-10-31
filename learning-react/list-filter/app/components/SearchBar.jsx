import React, { Component, PropTypes } from 'react';

class SearchBar extends Component {
    constructor(){
        super();

        this.handleChange = this.handleChange.bind(this);
    }
    handleChange(event){
        this.props.onUserInput(event.target.value);
    }
    render(){
        return <input type="search" placeholder="search" 
                value={this.props.filterText}
                onChange={this.handleChange}/>
    }
}

SearchBar.propTypes = {
    filterText: PropTypes.string.isRequired,
    onUserInput: PropTypes.func.isRequired,
}

export default SearchBar;