import React from 'react'
import { Link } from 'react-router-dom'
import './App.css';
//import { format } from 'date-fns'

export default function Note(props) {
    return (
      <div className='Note'>
        <h2 className='Note-title'>
            <Link to={`/note/${props.id}`}>
                {props.name}
            </Link>
        </h2>
        <button>Delete Note</button>
        <div className='Date'>
            <div className='Note-Date-modified'>
            </div>
        </div>
      </div>
    )
}