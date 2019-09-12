import React, {Component} from 'react';
import {Route, Link} from 'react-router-dom';
import NoteListNav from './NoteListNav';
import NotePageNav from './NotePageNav';
import NoteListMain from './NoteListMain';
import NotePageMain from './NotePageMain';
import NoteContext from './NoteContext';
import AddNote from './AddNote'
import AddFolder from './AddFolder'
import './App.css';

class App extends Component {
    state = {
        notes: [],
        folders: [],
    };

    componentDidMount() {
        Promise.all([
            fetch(`http://localhost:9090/notes`),
            fetch(`http://localhost:9090/folders`)
        ])
            .then(([notesRes, foldersRes]) => {
                if (!notesRes.ok)
                    return notesRes.json().then(e => Promise.reject(e));
                if (!foldersRes.ok)
                    return foldersRes.json().then(e => Promise.reject(e));

                return Promise.all([notesRes.json(), foldersRes.json()]);
            })
            .then(([notes, folders]) => {
                this.setState({notes, folders});
                console.log('notes: ', notes)
                console.log('folders: ', folders)
            })
            .catch(error => {
                console.error({error});
            });
    }

    deleteNote = noteId => {
        this.setState({
            notes: this.state.notes.filter( note => note.id !== noteId)
        });
    };

    updateFolder = (name, id ) => {
        console.log('updateFolder', id)
        let newFolders = this.state.folders;
        newFolders.push({id, name})
        this.setState({
            folders: newFolders
        });
    }

    addNote = (id, noteName, folderId, content) => {
        console.log(id, noteName, folderId, content)
        let newNotes = this.state.notes;
        newNotes.push({id, noteName, folderId, content})
        this.setState({
            notes: newNotes
        });
    }

    renderNavRoutes() {
        return (
            <>
                {['/', '/folder/:folderId'].map(path => (
                    <Route
                        exact
                        key={path}
                        path={path}
                        component={NoteListNav}
                    />
                ))}
                <Route path='/note/:noteId' component={NotePageNav} />
            </>
        );
    }

    renderMainRoutes() {
        return (
            <>
                {['/', '/folder/:folderId'].map(path => (
                    <Route
                        exact
                        key={path}
                        path={path}
                        component={NoteListMain}
                    />
                ))}
                <Route path='/note/:noteId' component={NotePageMain} />
                <Route path='/add-note' component={AddNote} />
                <Route path='/add-folder' component={AddFolder} />
            </>
        );
    }

    render() {
        console.log(this.state.folders)
        const contextValue = {
            folders: this.state.folders,
            notes: this.state.notes,
            deleteNote: this.deleteNote,
            addNote: this.addNote,
            updateFolder: this.updateFolder
        };
        return (
            <NoteContext.Provider value={contextValue}>
            <div className="App">
        
                <nav className="App__nav">{this.renderNavRoutes()}</nav>
                <header className="App__header">
                    <h1>
                        <Link to="/">Noteful</Link>{' '}
                    </h1>
                </header>
                <main className="App__main">{this.renderMainRoutes()}</main>
            </div>
            </NoteContext.Provider>
        );
    }
}

export default App;