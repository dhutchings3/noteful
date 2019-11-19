
import React from 'react'
import Note from './Note'
import NoteContext from './NoteContext'
import './App.css';

export default class NotePageMain extends React.Component {
  static defaultProps = {
    match: {
      params: {}
    }
  }
  static contextType = NoteContext

  handleDeleteNote = noteId => {
    this.props.history.push(`/`)
  }

  render() {
    const findNote = (notes=[], noteId) =>
    notes.find(note => note.id === noteId)
    const { notes=[] } = this.context
    const { noteId } = this.props.match.params
    const note = findNote(notes, parseInt(noteId)) || { content: '' }
    return (
      <section className='NotePageMain'>
        <Note
          id={note.id}
          name={note.name}
          modified={note.modified}
          content={note.content}
          onDeleteNote={this.handleDeleteNote}
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