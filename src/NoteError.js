import React, {Component} from 'react';
import NoteListNav from './NoteListNav';
import NotePageNav from './NotePageNav';
import NoteListMain from './NoteListMain';
import NotePageMain from './NotePageMain';
import NoteContext from './NoteContext';
import AddNote from './AddNote'
import AddFolder from './AddFolder'

export default class NoteError extends Component {
    constructor(props) {
        super(props);
        this.state = {
          hasError: false
        };
      }

    static getDerivedStateFromError(error) {
        return { hasError: true };
    }


    render() {
        if (this.state.hasError) {      
          return (
            <h2>Could not display Note.</h2>
          );
        }
        return this.props.children;
    }  


}