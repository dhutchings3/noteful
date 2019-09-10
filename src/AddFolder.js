import React from 'react'
import ValidationError from './ValidationError'

export default class AddFolder extends React.Component {
    constructor(props) {
        super(props);
            this.state = {
            folderName: {
                value: "",
                touched: false,
            }
        }
    }

    updateName(folderName) {
        this.setState({ folderName: { value: folderName, touched: true } });
    }

    handleSubmit(e) {
        e.preventDefault();
        const folderName = this.state
        
        fetch(`http://localhost:9090/folders`, {
            method: 'POST',
            body: {
                id: '',
                name: folderName
            }
        });

        console.log('Folder Name: ', folderName.value);
    }

    validateName() {
        const folderName = this.state.folderName.value.trim();
        if (folderName.length === 0) {
            return 'Name is required';
        } else  if (folderName.length < 3) {
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
                    {this.state.folderName.touched && <ValidationError message={nameError} />}
                    <button 
                        type='submit' 
                        className='addFolder-button'
                        disabled= {
                            this.validateName()
                        }
                    >
                        Save</button>
                </form>
            </div>
        )
    }

}