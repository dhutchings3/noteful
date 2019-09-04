import React from 'react'
import Note from './Note'
import './App.css';

export default function NoteListMain(props) {
    return (
        <section className='Note-List'>
            <ul>
                {props.notes.map(note => 
                <li key={note.id}>
                    <Note 
                    id={note.id}
                    name={note.name}
                    modified={note.modified}/>
                </li>
                )}
                <button className='add-note'>Add Note</button>
            </ul>
        </section>
    )   
}

NoteListMain.defaultProps = {
    notes: [],
}
