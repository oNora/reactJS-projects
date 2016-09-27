import React from 'react';
import classnames from 'classnames'; //https://www.npmjs.com/package/classnames

class Edit  extends  React.Component {
    constructor(props) {
        super(props);

        this.checkEnter = this.checkEnter.bind(this);
        this.finishEdit = this.finishEdit.bind(this);
    }
    checkEnter (e) {
        if(e.key === 'Enter') {
            this.finishEdit(e);
        }
    }
    finishEdit(e) {
        const value = e.target.value;

        if(this.props.onEdit) {
            this.props.onEdit(value);
        }
    }

    render() {
        // console.log('this.props.: Edit', this.props);
        return (  
                <input
                    type="text"
                    autoFocus={true}
                    defaultValue = {this.props.value}
                    onBlur={this.finishEdit}
                    onKeyPress={this.checkEnter}
                    className={classnames('edit', this.props.className)}

                />
            )
    }


}


class Editable extends  React.Component {

    render() {

        if(this.props.editing) {
            return(
                <Edit className={this.props.className} value={this.props.value} {...this.props} />
            )
        }

        return (<span className={classnames('value', this.props.className)}> {this.props.value}</span>);
    }
}

export default Editable;