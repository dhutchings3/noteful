import React from 'react'
import { Link } from 'react-router-dom'
import config from './config'
import './App.css';
import NoteContext from './NoteContext';
//import { format } from 'date-fns'

export default class Note extends React.Component {
  static defaultProps ={
    onDeleteNote: () => {}
  }

  static contextType = NoteContext;

  handleClickDelete = e => {
    e.preventDefault()
    const noteId = this.props.id

    fetch(config.API_ENDPOINT + `/notes/${noteId}`, {
      method: 'DELETE'
      // headers: {
      //   'content-type': 'application/json'
      // }
    })
      .then(res => {
        if (!res.ok)
          return res.json().then(e => {
            throw e;
          })
        })

      .then(() => {
        this.context.deleteNote(noteId)
        // allow parent to perform extra behavior
        this.props.onDeleteNote(noteId)
      })
      .catch(error => {
        console.error({ error })
      })
    }

  render() {

    const { name, id, modified } = this.props;

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
            onClick={this.handleClickDelete}
          >
          Delete Note
          </button>
        </div>
      )
    }
}