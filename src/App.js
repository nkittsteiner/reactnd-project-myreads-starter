import React from 'react'
// import * as BooksAPI from './BooksAPI'
import './App.css'
import SearchBook from './SearchBook'
import BookList from './BookList'
import * as BooksAPI from './BooksAPI'

class BooksApp extends React.Component {
  state = {
    /**
     * TODO: Instead of using this state variable to keep track of which page
     * we're on, use the URL in the browser's address bar. This will ensure that
     * users can use the browser's back and forward buttons to navigate between
     * pages, as well as provide a good URL they can bookmark and share.
     */
    showSearchPage: false,
    currentlyReading: [],
    wantToRead: [],
    read: []
  }

  componentDidMount = () => {
    BooksAPI.getAll().then((books) => {
      console.log('books', books)
      this.setState((state) => ({
        currentlyReading: books.filter(book => book.shelf === 'currentlyReading'),
        wantToRead: books.filter(book => book.shelf === 'wantToRead'),
        read: books.filter(book => book.shelf === 'read')
      }))
    })
  }

  closeSearch = () => {
    this.setState((state) =>({
      showSearchPage: false
    }))
  }

  render() {
    return (
      <div className="app">
        {this.state.showSearchPage ? (
          <SearchBook 
            onCloseSearch={this.closeSearch} />
        ) : (
          <BookList 
            currentlyReading={this.state.currentlyReading} 
            wantToRead={this.state.wantToRead}
            read={this.state.read} />
        )}
      </div>
    )
  }
}

export default BooksApp
