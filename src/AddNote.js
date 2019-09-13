import React from 'react'
import ValidationError from './ValidationError'
import NoteContext from './NoteContext'

export default class AddNote extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            noteName: '',
            touched: false,

            content: '',
            touched: false,

            folder: '',
            touched: false
        }
    }

    updateName(noteName) {
        this.setState({ 
            noteName: noteName,
            touched: true, 
        })        
    }

    updateContent(content) {
        this.setState({ 
            content: content, 
            touched: true, 
        });
    }
    
    updateFolder(folder) {
        this.setState({ 
            folder: folder, 
            touched: true,
        });
    }

    static defaultProps = {
        addNote: () => {},
    }
    static contextType = NoteContext;

    handleSubmit(e) {
        e.preventDefault();

        const newNote ={
            name: e.target.noteName.value,
            content: e.target.content.value,
            folderId: e.target.folder.value,
            modified: new Date(),
        }

        fetch(`http://localhost:9090/notes`, {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
            },
            body: JSON.stringify (newNote)
            })
            .then(res => {
            if (!res.ok)
                return res.json().then(e => Promise.reject(e))
            return res.json()
            })
            .then(note => {
                this.context.addNote(note)
                this.props.history.push(`/folder/${note.folderId}`)
            })
            .catch(error => {
            console.error({ error })
            })
    }
        
    validateName() {
        const noteName = this.state.noteName.toString().trim();
        if (noteName.length === 0) {
            return 'Name is required';
        } else  if (noteName.length < 3) {
            return 'Name must be at least 3 characters long';
        }
    }

    validateContent() {
        const content = this.state.content.toString().trim();
        if (content.length === 0) {
            return 'Content is required';
        } else  if (content.length < 10 || content.length > 200) {
            return 'Content must be between 10 and 200 characters long';
        }
    }

    validateFolder() {
        const folderId = this.state.folder.toString().trim();
        if (!folderId) {
            return '*Folder selection is required'
        }
    }

    render() {
        const { folders=[] } = this.context
        const noteNameError = this.validateName();
        const contentError = this.validateContent();
        const folderError = this.validateFolder();
        return (
                <form className='add-note-form' onSubmit={(e)=> this.handleSubmit(e)}>
                    <h2>Add Note</h2>
                    <div className='note-name'>
                        <label htmlFor='note'>Note Name:</label>
                        <input 
                            type='text' 
                            id='noteName' 
                            defaultValue='Note name' 
                            name='noteName'
                            onChange={e => this.updateName(e.target.value)}
                        />
                        {this.state.touched && <ValidationError message={noteNameError} />}
                    </div>
                    <div className='content-area'>
                        <label htmlFor='content'>Content:</label>
                            <input 
                                type='text' 
                                id='content' 
                                defaultValue='Note context goes here' 
                                name='content'
                                onChange={e => this.updateContent(e.target.value)}
                            />
                        {this.state.touched && <ValidationError message={contentError} />}
                    </div>
                    <div>
                        <label htmlFor='folder'>Folder:</label>
                        <select 
                            className='folder-select'
                            name = 'folder'
                            id = 'folder'
                            onChange={e => this.updateFolder(e.target.value)}
                        >
                            <option>Select Folder</option>
                            {folders.map(folder=>
                            <option value = {folder.id}>
                            {folder.name}
                            </option>
                            )}

                        {this.state.touched}
                        </select>
                    </div>
                    <div>
                    <ValidationError message={folderError} />
                    <button 
                        type='submit' 
                        className='addNote-button'
                        disabled= {
                            this.validateName() ||
                            this.validateContent() ||
                            this.validateFolder()
                        }
                    >
                        Save
                    </button>
                    </div>
                </form>
        )
    }

}