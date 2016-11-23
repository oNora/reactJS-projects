import React, {Component, PropTypes} from 'react';

import { connect } from 'react-redux';
import BookmarkActionsCreator from '../actions/BookmarkActionsCreator.js';

class EditComponent extends Component {
    constructor() {
        super();

        this.clearField = this.clearField.bind(this);
    }

    handleChange(field, e){
        this.props.handleChange(field, e.target.value);
    }

    clearField(){
        this.props.clearField();
    }

    render() {

        return (
            <div>
                <form onSubmit={this.props.handleSubmit.bind(this)}>
                    <input type="text" name=""
                        value={this.props.selectedBookmark.title}
                        onChange={this.handleChange.bind(this,'title')}
                        placeholder="Title"/>
                    <input type="text" name=""
                        value={this.props.selectedBookmark.url}
                        onChange={this.handleChange.bind(this,'url')}
                        placeholder="URL" />
                    <button type="submit">Save </button>
                    <button type="button" onClick={this.clearField}> Clear </button>
                </form>
                <br/>
                <br/>
            </div>
        );
    }
}


EditComponent.propTypes = {
    selectedBookmark: PropTypes.shape({
        id: PropTypes.string,
        title: PropTypes.string,
        url: PropTypes.string
    }),
    handleSubmit: PropTypes.func,
    clearField: PropTypes.func

}

export default EditComponent;

// const mapStateToProps = (state) => ({});

// const mapDispatchToProps = (dispatch) => (
//   {
    
//   }
// );

// export default connect(mapStateToProps, mapDispatchToProps)(EditComponent);