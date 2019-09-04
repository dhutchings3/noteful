import React from 'react'
import './App.css';

export default function NotePageNav(props) {
  return (
    <div className='NotePageNav'>
      <button>
        Back
      </button>
      {props.folder && (
        <h3 className='NotePageNav__folder-name'>
          {props.folder.name}
        </h3>
      )}
    </div>
  )
}

NotePageNav.defaultProps = {
  history: {
    goBack: () => {}
  }
}