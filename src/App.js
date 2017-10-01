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
    read: [],
    allBooks: []
  }

  componentDidMount = () => {
    BooksAPI.getAll().then((books) => {
      this.setState((state) => ({
        currentlyReading: books.filter(book => book.shelf === 'currentlyReading'),
        wantToRead: books.filter(book => book.shelf === 'wantToRead'),
        read: books.filter(book => book.shelf === 'read'),
        allBooks: books
      }))
    })
  }

  closeSearch = () => {
    this.setState((state) =>({
      showSearchPage: false
    }))
  }

  openSearch = () => {
    this.setState((state) =>({
      showSearchPage: true
    }))
  }  

  changeShelf = (bookId, to) => {
    // Get book by ID
    BooksAPI.get(bookId).then((book) => {
      if(book == null)
        return
      //Update book via API
      BooksAPI.update(book, to).then((res) => {
        console.log('UPDATE', res)
        // TODO: Make update locally
        BooksAPI.getAll().then((books) => {
          this.setState((state) => ({
            currentlyReading: books.filter(book => book.shelf === 'currentlyReading'),
            wantToRead: books.filter(book => book.shelf === 'wantToRead'),
            read: books.filter(book => book.shelf === 'read'),
            allBooks: books
          }))
        })

      })

      
    })

  }

  render() {
    return (
      <div className="app">
        {this.state.showSearchPage ? (
          <SearchBook
            books={this.state.allBooks} 
            onCloseSearch={this.closeSearch} 
            onChangeShelf={this.changeShelf} />
        ) : (
          <BookList 
            currentlyReading={this.state.currentlyReading} 
            wantToRead={this.state.wantToRead}
            read={this.state.read} 
            onOpenSearch={this.openSearch} 
            onChangeShelf={this.changeShelf} />
        )}
      </div>
    )
  }
}

export default BooksApp
