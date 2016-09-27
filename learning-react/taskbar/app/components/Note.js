import React from 'react';

class Note extends  React.Component {

    render() {
        return (
            <div {...this.props}>
                {this.props.children}
            </div>
        ) 
    }
} 

export default Note;