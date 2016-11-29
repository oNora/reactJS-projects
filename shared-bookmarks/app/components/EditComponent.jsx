import React, {Component, PropTypes} from 'react';

import { connect } from 'react-redux';
import BookmarkActionsCreator from '../actions/BookmarkActionsCreator.js';

import customStyle from './editComponent.css';

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
            <div className="panel panel-primary">
                <div className="panel-body">
                    <form onSubmit={this.props.handleSubmit.bind(this)}>
                        <input type="text" name=""
                            value={this.props.selectedBookmark.title}
                            onChange={this.handleChange.bind(this,'title')}
                            placeholder="Title"
                            className={customStyle.titleInput}/>
                        <input type="text" name=""
                            value={this.props.selectedBookmark.url}
                            onChange={this.handleChange.bind(this,'url')}
                            placeholder="URL" 
                            className={customStyle.urlInput}/>
                        <button type="submit" className="btn btn-primary">
                            <span className="glyphicon glyphicon-ok"></span>
                            <span className="hidden-xs"> Save </span>
                        </button>
                        <button type="button" onClick={this.clearField} className="btn btn-warning">
                            <span className="glyphicon glyphicon-remove"></span>
                            <span className="hidden-xs"> Clear </span>
                        </button>
                    </form>
                </div>
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