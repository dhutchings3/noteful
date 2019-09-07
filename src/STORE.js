import React from 'react'

export default React.createContext({
    folders: [],
    notes: [],
    addfolder: () => {},
    addNote: () => {},
    deleteBookmark: () => {},
})