import React from 'react'
import Note from './Note'
import { NavLink } from 'react-router-dom'
import NoteContext from './NoteContext'
import './App.css';

export default class NoteListMain extends React.Component {
    static defaultProps = {
        match: {
            params: {}
        }
    }

    static contextType = NoteContext;

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
                    <NavLink
                    className='addNote'
                    to={`/add-note`}
                    >
                        Add Note
                    </NavLink>
                </ul>
            </section>
        )   
    }
}
