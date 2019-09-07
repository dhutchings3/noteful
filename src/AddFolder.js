import React from 'react'
import BookContext from './BookContext'
import App from '/App'

export default class AddFolder extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          folderName: {
            value: "",
            touched: false
          }
        }
    }

    handleSubmit(e) {
        e.preventDefault();
        const folderName = this.folderNameInput.current.value;
        console.log('Folder Name: ', folderName);
      }
    }

    render() {
        return (
            <div className='add-folder'>
                <form className='add-folder-form' onSubmit={(e)=> this.handleSubmit(e)}>
                    <h2>Add Folder</h2>
                    <label>Folder Name:</label>
                    <input type='text' id='folderName' defaultValue='Folder name' ref={this.nameInput}/>
                    <button type='submit' value type='submit'>Submit</button>
                </form>
            </div>
        )
    }

}