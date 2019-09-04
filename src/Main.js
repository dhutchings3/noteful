import React, { Component } from 'react'

export default class Main extends Component {
  render() {
    return (
      <div className='Main'>
          <article>
          <Route 
            path= '/folders'
            component={Folder}
          />
          </article>
          <main>
          <Route 
            path= '/notes/:noteId'
            component={Note}
          />
          <button>Add Note</button>
          </main>
      </div>
    )
  }
}