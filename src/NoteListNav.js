import React, {Fragment} from 'react'
import { NavLink } from 'react-router-dom'
import './App.css';
import NoteContext from './NoteContext'
//import AddFolder from './AddFolder'

export default class NoteListNav extends React.Component {
    static contextType = NoteContext;

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
                    <Fragment>
                    <NavLink
                        className='addFolder'
                        to={`/add-folder`}
                        type='button'
                    >
                        Add Folder
                    </NavLink>
                    </Fragment>
                </div>
        )
    }

}
