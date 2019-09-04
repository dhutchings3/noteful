import React from 'react'
import { NavLink } from 'react-router-dom'
import './App.css';

export default function NoteListNav(props) {
    return (
        <div className="Notes-list">
            <ul>
                {props.folders.map(folder =>
                    <li key={folder.id}>
                        <NavLink 
                        className='NoteListNav-folderlink'
                        to={`folder/${folder.id}`}
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

NoteListNav.defaultProps = {
    folders: [],
}
