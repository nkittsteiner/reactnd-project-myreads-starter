import React from 'react'
import { Route } from 'react-router-dom'
import './App.css'
import SearchBook from './SearchBook'
import BookList from './BookList'
import * as BooksAPI from './BooksAPI'

class BooksApp extends React.Component {
  state = {
    books: []
  }

  componentDidMount = () => {
    BooksAPI.getAll().then((books) => {
      this.setState((state) => ({
        books: books
      }))
    })
  }

  changeShelf = (bookId, to) => {
    // Get book by ID
    BooksAPI.get(bookId).then((book) => {
      if(book == null)
        return
      //Update book via API
      BooksAPI.update(book, to)

      book.shelf = to

      this.setState((state) => ({
        books: this.state.books.filter(b => b.id !== bookId).concat([book])
      }))    

    })

  }

  render() {
    return (
      <div className="app">
        <Route exact path="/" render={() => (
          <BookList 
            books={this.state.books}
            onChangeShelf={this.changeShelf} />
        )}/>

        <Route path="/search" render={({ history }) => (
          <SearchBook
          books={this.state.books} 
          onChangeShelf={(bookId, to) => {
           this.changeShelf(bookId, to)
           history.push('/') 
         }} />
        
        )}/>
      </div>
    )
  }
}

export default BooksApp
