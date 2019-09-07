import React from 'react'
import Note from './Note'
import BookContext from './BookContext'
import './App.css';

export default class NoteListMain extends React.Component {
    static defaultProps = {
        match: {
            params: {}
        }
    }

    static contextType = BookContext;

    render() {
        const getNotesForFolder = (notes=[], folderId) => (
            (!folderId)
              ? notes
              : notes.filter(note => note.folderId === folderId)
        )
        const { folderId } = this.props.match.params
        const { notes=[] } = this.context
        const notesForFolder = getNotesForFolder(notes, folderId)
        return (
            <section className='Note-List'>
                <ul>
                    {notesForFolder.map(note => 
                    <li key={note.id}>
                      <Note
                        id={note.id}
                        name={note.name}
                        modified={note.modified}
                        />
                    </li>
                    )}
                    <button type='button'>
                    Add Note
                    </button>
                </ul>
            </section>
        )   
    }
}
