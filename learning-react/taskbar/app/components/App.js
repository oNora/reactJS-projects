import React from 'react';
import uuid from 'uuid';

import Notes from './Notes';

class App extends  React.Component {
    constructor(props) {
        super(props);

        this.state = {
            notes: [
                {
                    id: uuid.v4(),
                    task: 'Learn React'
                },
                {
                    id: uuid.v4(),
                    task: 'Do laundry'
                }
            ]
        };

        this.addNote = this.addNote.bind(this);
        this.deleteNote = this.deleteNote.bind(this);
        this.editNote = this.editNote.bind(this);
        this.activateNoteEdit = this.activateNoteEdit.bind(this);
    }
    addNote () {
        this.setState({
            notes: this.state.notes.concat([{
                id: uuid.v4(),
                task: 'New task'
            }])
        });
    }
    deleteNote (id, e)  {
        // console.log('deleteNote');
        // Avoid bubbling to edit
        e.stopPropagation();

        this.setState({
            notes: this.state.notes.filter(note => note.id !== id)
        });
    }
    activateNoteEdit (id, e) {
        // console.log('active');
        this.setState({
            notes: this.state.notes.map(note => {
                if(note.id === id) {
                    note.editing = true;
                }

                return note;
            })
        });
    }
    editNote (id, task) {
        //  console.log('editNote');
        this.setState({
            notes: this.state.notes.map(note => {
                if(note.id === id) {
                    note.editing = false;
                    note.task = task;
                }

                return note;
            })
        });
    }
    render() {
    const {notes} = this.state;

    return (
      <div>

        <button className="add-note" onClick={this.addNote}>+</button>
        <Notes
          notes={notes}
          onNoteClick={this.activateNoteEdit}
          onEdit={this.editNote}
          onDelete={this.deleteNote}
          />

      </div>
    );
  }

}
export default App;