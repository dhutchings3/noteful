import React from 'react'
import ValidationError from './ValidationError'
import NoteContext from './NoteContext'

export default class AddFolder extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            folderName: '',
            touched: false,
        }
    }

    static defaultProps ={
        addFolder: () => {},
      }
    
    static contextType = NoteContext;

    updateName(folderName) {
        this.setState({ 
            folderName: folderName, 
            touched: true,
        });
    }
    handleSubmit(e) {
        e.preventDefault();
        const newFolder = {
            name: e.target['folderName'].value
        }        
        fetch(`http://localhost:9090/folders`, {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
            },
            body: JSON.stringify(newFolder),
            })
            .then(res => {
                if (!res.ok)
                  return res.json().then(e => Promise.reject(e))
                return res.json()
            })
            .then(folder => {
                this.context.addFolder(folder)
                this.props.history.push(`/`)
            })
            .catch(error => {
                console.error({ error })
            })
    }

    validateName() {
        const name = this.state.folderName.toString().trim();
        if (name.length === 0) {
            return 'Name is required';
        } else  if (name.length < 3) {
            return 'Name must be at least 3 characters long';
        }
    }

    render() {
        const nameError = this.validateName();
        return (
            <div className='add-folder'>
                <form className='add-folder-form' onSubmit={(e)=> this.handleSubmit(e)}>
                    <h2>Add Folder</h2>
                    <label>Folder Name:</label>
                    <input 
                        type='text' 
                        id='folderName' 
                        defaultValue='Folder name' 
                        name='folderName'
                        onChange={e => this.updateName(e.target.value)}
                    />
                    {this.state.touched && <ValidationError message={nameError} />}
                    <button 
                        type='submit' 
                        className='addFolder-button'
                        disabled= {
                            this.validateName()
                        }
                    >
                        Add
                    </button>
                </form>
            </div>
        )
    }

}