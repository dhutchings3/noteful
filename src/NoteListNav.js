import React from 'react'
import { NavLink } from 'react-router-dom'
import './App.css';
import BookContext from './BookContext'

export default class NoteListNav extends React.Component {
    static contextType = BookContext;

    render()  {
        const { folders=[] } = this.context
        return (
                <div className="Notes-list">
                    <ul>
                        {folders.map(folder=>
                            <li key={folder.id}>
                                <NavLink 
                                    className="note-list-nav"
                                    to={`/folder/${folder.id}`}
                                    name={folder.name}
                                >
                                {folder.name}    
                                </NavLink>
                            </li>
                        )}
                    </ul>
                    <button className='add-folder'>Add Folder</button>
                </div>
        )
    }

}
