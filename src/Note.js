import React from 'react'
import { Link } from 'react-router-dom'
import './App.css';
import BookContext from './STORE';
//import { format } from 'date-fns'

export default class Note extends React.Component {
  static defaultProps ={
    onDeleteNote: () => {},
  }

  static contextType = BookContext;

  handleClickDelete = e => {
    e.preventDefault()
    const noteId = this.props.id

    fetch(`http://localhost:9090/notes/notes/${noteId}`, {
      method: 'DELETE',
      headers: {
        'content-type': 'application/json'
      },
    })
      .then(res => {
        if (!res.ok)
          return res.json().then(e => Promise.reject(e))
        return res.json()
      })
      .then(() => {
        this.context.deleteNote(noteId)
        // allow parent to perform extra behaviour
        this.props.onDeleteNote(noteId)
      })
      .catch(error => {
        console.error({ error })
      })
  }

  render() {
    const { name, id, modified } = this.props
      return (
        <div className='Note'>
          <h2 className='Note-title'>
              <Link to={`/note/${id}`}>
                  {name}
              </Link>
          </h2>
          <button 
            className='delete-button'
            type='button'
            onClick={this.deleteNoteRequest}
          >
          Delete Note
          </button>
          <div className='Date'>
              <div className='Note-Date-modified'>
              </div>
          </div>
          )}
        </div>
      )
    }
}