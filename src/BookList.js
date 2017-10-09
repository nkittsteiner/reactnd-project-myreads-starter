import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import Shelf from './Shelf'

class BookList extends Component {

  static propTypes = {
    books: PropTypes.array.isRequired,
    onChangeShelf: PropTypes.func.isRequired
  }

  changeShelf = (bookId, to) => {
    this.props.onChangeShelf(bookId, to)
  }

  render(){

    const { books } = this.props

    return(
        <div>
          <div className="list-books">
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>
            <div className="list-books-content">
              <Shelf title={"Currently Reading"} books={books.filter(book => book.shelf === 'currentlyReading')} onChangeShelf={this.changeShelf} />
              <Shelf title={"Want to Read"} books={books.filter(book => book.shelf === 'wantToRead')} onChangeShelf={this.changeShelf} />
              <Shelf title={"Read"} books={books.filter(book => book.shelf === 'read')} onChangeShelf={this.changeShelf} />
            </div>
            <div className="open-search">
              <Link className="close-search" to='/search'>Add a book</Link>
            </div>
          </div>
        </div>
    )
  }
  
}

export default BookList