import React from 'react'
import { NavLink } from 'react-router-dom'
import './App.css';
import BookContext from './STORE';

export default class NoteListNav extends React.Component {
    static contextType = BookContext;

    render()  {
        const { folders=[] } = this.context
        return (
            <div className="Notes-list">
                <ul>
                    {folders.map(folder =>
                        <li key={folder.id}>
                            <NavLink />
                        </li>
                        )}
                </ul>
                <button className='add-folder'>Add Folder</button>
            </div>
        )
    }

}
