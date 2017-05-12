import React, { Component, PropTypes } from 'react';

class AddCommentField extends Component {

    constructor(props) {
        super(props);

        this.handleKeyPress = this.handleKeyPress.bind(this);
    }

    handleKeyPress(e) {
        if (e.key === 'Enter') {
            this.props.submit(this.commentTextarea.value, this.props.parentCommentId);
            this.commentTextarea.value = null;
            this.commentTextarea.blur();
        }
    }

    render() {
        return (
            <form className="form-add-comment">
                <textarea rows="4" cols="50" ref={ c => this.commentTextarea = c } placeholder='Write a comment and hit Enter for submit' onKeyPress={this.handleKeyPress}></textarea>
            </form>
        );
    }
}

AddCommentField.propTypes = {
    submit         : PropTypes.func.isRequired,
    parentCommentId: PropTypes.number,
};

export default AddCommentField;