import React from 'react'
import ValidationError from './ValidationError'
import NoteContext from './NoteContext'

export default class AddNote extends React.Component {
    constructor(props) {
        super(props);
            this.state = {
            noteName: {
                value: '',
                touched: false,
            },
            content: {
                value: '',
                touched: false
            },
            folder: {
                value: '',
                touched: false
            }
        };
    }

    static contextType = NoteContext;

    updateName(noteName) {
        this.setState({ noteName: { value: noteName, touched: true } });
    }

    updateContent(content) {
        this.setState({ content: { value: content, touched: true } });
    }

    updateFolder(folder) {
        this.setState({ folder: { value: folder, touched: true } });
    }

    handleSubmit(e) {
        e.preventDefault();
        const { noteName, content, folder } = this.state;
        
        fetch(`http://localhost:9090/notes`, {
            method: 'POST',
            body: {
                id: '',
                name: noteName,
                modified: '',
                folderId: '',
                content: content,
                folder: folder,
            }
        });

        console.log('Note Name: ', noteName.value);
        console.log('Content: ', content.value);
        console.log('Folder: ', folder.value);
    }

    validateName() {
        const noteName = this.state.noteName.value.trim();
        if (noteName.length === 0) {
            return 'Name is required';
        } else  if (noteName.length < 3) {
            return 'Name must be at least 3 characters long';
        }
    }

    validateContent() {
        const content = this.state.content.value.trim();
        if (content.length === 0) {
            return 'Content is required';
        } else  if (content.length < 10 || content.length > 200) {
            return 'Content must be between 10 and 200 characters long';
        }
    }

    validateFolder() {
        const folder = this.state.folder.value.trim();
        if ( this.folder === 'Select Folder') {
            return 'Folder selection is required'
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
                        <label for='note'>Note Name:</label>
                        <input 
                            type='text' 
                            id='noteName' 
                            defaultValue='Note name' 
                            name='noteName'
                            onChange={e => this.updateName(e.target.value)}
                        />
                        {this.state.noteName.touched && <ValidationError message={noteNameError} />}
                    </div>
                    <div className='content-area'>
                        <label for='content'>Content:</label>
                            <input 
                                type='text' 
                                id='content' 
                                defaultValue='Note context goes here' 
                                name='content'
                                onChange={e => this.updateContext(e.target.value)}
                            />
                        {this.state.content.touched && <ValidationError message={contentError} />}
                    </div>
                    <div>
                        <label for='folder'>Folder:</label>
                        <select 
                            class='folder-select'
                            name = 'folder'
                            onSelect={e => this.updateFolder(e.target.value)}
                        >
                            <option>Select Folder</option>
                            <option>{this.folder}</option>
                            <option>{this.folder}</option>
                            <option>{this.folder}</option>

                        {this.state.folder.touched && <ValidationError message={folderError} />}
                        </select>
                    </div>
                    <div>
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