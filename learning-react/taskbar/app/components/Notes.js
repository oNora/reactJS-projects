import React from 'react';

import Note from './Note';
import Editable from './Editable';

//shorthand - ES7 
// const notes = [
//   {
//     id: '4e81fc6e-bfb6-419b-93e5-0242fb6f3f6a',
//     task: 'Learn React'
//   },
//   {
//     id: '11bbffc8-5891-4b45-b9ea-5c99aadf870f',
//     task: 'Do laundry'
//   }
// ];

// export default () => (
//   <ul>{notes.map(note =>
//     <li key={note.id}>{note.task}</li>
//   )}</ul>
// )

class Notes extends  React.Component {

    render() {
        return (
            <ul className="notes">{this.props.notes.map(note =>
                <li key={note.id}>
                    <Note className="note" onClick={this.props.onNoteClick.bind(null, note.id)}>
                        <Editable
                            className="editable"
                            editing={note.editing}
                            value={note.task}
                            onEdit={this.props.onEdit.bind(null, note.id)} />
                        <button className="delete" onClick={this.props.onDelete.bind(null, note.id)}>x</button>
                    </Note>
                </li>
            )}</ul>
        ) 
    }
}
// Notes.propTypes = { task: React.PropTypes.string.isRequired };
export default Notes;