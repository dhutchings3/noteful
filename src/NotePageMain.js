import React from 'react'
import Note from './Note'
import './App.css';
import BookContext from './STORE'

export default class NotePageMain extends React.Component {
    static defaultProps = {
        match: {
            params: {}
        }
    }
    static contextType = BookContext

    handleDeleteNote = noteId => {
        this.props.history.push(`/`)
    }

    render() {
        const findNote = (notes=[], noteId) =>
        notes.find(note => note.id === noteId)
        const { notes=[] } = this.context
        const { noteId } = this.match.params
        const note = findNote(notes, noteId) || { content: '' }
        return (
            <section className='NotePageMain'>
                <Note
                id={note.id}
                name={note.name}
                modified={note.modified}
                onDeleteNote={this.onDeleteNote}
                />
            <div className='NotePageMain__content'>
                {note.content.split(/\n \r|\n/).map((para, i) =>
                    <p key={i}>{para}</p>
            )}
            </div>
            </section>
        )
    }
}
