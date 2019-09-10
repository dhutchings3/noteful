import React from 'react'
import NoteContext from './NoteContext'
import './App.css';

export default class NotePageNav extends React.Component {
  static defaultProps = {
    history: {
      goBack: () => { }
      },
      match: {
        params: {}
      }
    }
  static contextType = NoteContext;
  
  render() {
    const findFolder = (folders=[], folderId) =>
    folders.find(folder => folder.id === folderId)
    const findNote = (notes=[], noteId) =>
    notes.find(note => note.id === noteId)
    const { notes, folders, } = this.context
    const { noteId } = this.props.match.params
    const note = findNote(notes, noteId) || {}
    const folder = findFolder(folders, note.folderId)
    return (
      <div className='NotePageNav'>
        <button 
        tag ='button'
        role='link'
        onClick={() => this.props.history.goBack()}
        className='page-nav-back'
        >
          Back
        </button>
        {folder && (
          <h3 className='NotePageNav__folder-name'>
            {folder.name}
          </h3>
        )}
      </div>
    )
  }
}
