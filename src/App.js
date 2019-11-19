import React, {Component} from 'react';
import {Route, Link} from 'react-router-dom';
import NoteListNav from './NoteListNav';
import NotePageNav from './NotePageNav';
import NoteListMain from './NoteListMain';
import NotePageMain from './NotePageMain';
import NoteContext from './NoteContext';
import AddNote from './AddNote'
import AddFolder from './AddFolder'
import NoteError from './NoteError'
import config from './config'
import './App.css';

class App extends Component {
    state = {
        notes: [],
        folders: [],
    };

    componentDidMount() {
        Promise.all([
            fetch(`${config.API_ENDPOINT}/notes`),
            fetch(`${config.API_ENDPOINT}/folders`)
        ])
            .then(([notesRes, foldersRes]) => {
                if (!notesRes.ok)
                    return notesRes.json().then(e => Promise.reject(e));
                if (!foldersRes.ok)
                    return foldersRes.json().then(e => Promise.reject(e));

                return Promise.all([
                    notesRes.json(), 
                    foldersRes.json()
                ])
            })
            .then(([notes, folders]) => {
                this.setState({notes, folders});
            })
            .catch(error => {
                console.error({ error });
            })
    }

    deleteNote = noteId => {
        this.setState({
            notes: this.state.notes.filter( note => note.id !== noteId)
        });
    };

    addFolder = (folder) => {
        let newFolders = this.state.folders; 
        newFolders.push(folder)
        this.setState({
            folders: newFolders
        });
    }

    addNote = (note) => {
        let newNotes = this.state.notes;
        newNotes.push(note)
        this.setState({
            notes: newNotes
        });
    }

    renderNavRoutes() {
        return (
            <>
                {['/', '/folder/:folder_id'].map(path => (
                    <Route
                        exact
                        key={path}
                        path={path}
                        component={NoteListNav}
                    />
                ))}
                <Route 
                    path='/note/:noteId' 
                    component={NotePageNav} 
                />
                <Route
                    path='/add-folder'
                    component={NotePageNav}
                />
                 <Route
                    path='/add-note'
                    component={NotePageNav}
                />
            </>
        );
    }

    renderMainRoutes() {
        return (
            <>
                {['/', '/folder/:folder_id'].map(path => (
                    <Route
                        exact
                        key={path}
                        path={path}
                        component={NoteListMain}
                    />
                ))}
                <Route 
                    path='/note/:noteId' 
                    component={NotePageMain} 
                />
                <Route 
                    path='/add-note' 
                    component={AddNote} 
                />
                <Route 
                path='/add-folder' 
                component={AddFolder} 
                />
            </>
        );
    }

    render() {
        const contextValue = {
            folders: this.state.folders,
            notes: this.state.notes,
            deleteNote: this.deleteNote,
            addNote: this.addNote,
            addFolder: this.addFolder
        };
        return (
            <NoteContext.Provider value={contextValue}>
            <NoteError>
            <div className="App">
        
                <nav className="App__nav">
                    {this.renderNavRoutes()}
                </nav>
                <header className="App__header">
                    <h1>
                        <Link to="/">Noteful</Link>
                        {' '}
                    </h1>
                </header>
                <main className="App__main">
                    {this.renderMainRoutes()}
                </main>
            </div>
            </NoteError>
            </NoteContext.Provider>
        )
    }
}

export default App;