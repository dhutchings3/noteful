import React, {Component} from 'react';
import {Route, Link} from 'react-router-dom';
import NoteListNav from './NoteListNav';
import NotePageNav from './NotePageNav';
import NoteListMain from './NoteListMain';
import NotePageMain from './NotePageMain';
import BookContext from './BookContext';
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
            </>
        );
    }

    render() {
        const contextValue = {
            folders: this.state.folders,
            notes: this.state.notes,
            deleteNote: this.deleteNote,
        };
        return (
            <BookContext.Provider value={contextValue}>
            <div className="App">
        
                <nav className="App__nav">{this.renderNavRoutes()}</nav>
                <header className="App__header">
                    <h1>
                        <Link to="/">Noteful</Link>{' '}
                    </h1>
                </header>
                <main className="App__main">{this.renderMainRoutes()}</main>
            </div>
            </BookContext.Provider>
        );
    }
}

export default App;