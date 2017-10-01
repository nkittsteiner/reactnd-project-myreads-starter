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
    books: []
  }

  componentDidMount = () => {
    BooksAPI.getAll().then((books) => {
      this.setState((state) => ({
        books: books
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
           
      })

      book.shelf = to

      this.setState((state) => ({
        books: this.state.books.filter(b => b.id !== bookId).concat([book])
      }))    

    })

  }

  render() {
    return (
      <div className="app">
        {this.state.showSearchPage ? (
          <SearchBook
            books={this.state.books} 
            onCloseSearch={this.closeSearch} 
            onChangeShelf={this.changeShelf} />
        ) : (
          <BookList 
            books={this.state.books}
            onOpenSearch={this.openSearch} 
            onChangeShelf={this.changeShelf} />
        )}
      </div>
    )
  }
}

export default BooksApp
