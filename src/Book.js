import React, { Component } from 'react'
import PropTypes from 'prop-types'

class Book extends Component {

  static propTypes = {        
      book: PropTypes.object.isRequired,
      onChangeShelf: PropTypes.func.isRequired
  }

  updateBook = (event) => {
    let bookId = event.target.id
    let shelf = event.target.value
    this.props.onChangeShelf(bookId, shelf)
  }      

  render(){

      const { book } = this.props
      return(
        <div>
          <li key={book.id}>
          <div className="book">
            <div className="book-top">
              <div className="book-cover book-cover-custom" style={{ backgroundImage: `url(${book.imageLinks.thumbnail})` }}></div>
              <div className="book-shelf-changer">
                <select id={book.id} value={book.shelf} onChange={this.updateBook} >
                  <option value="none" disabled>Move to...</option>
                  <option value="currentlyReading">Currently Reading</option>
                  <option value="wantToRead">Want to Read</option>
                  <option value="read">Read</option>
                  <option value="none">None</option>
                </select>
              </div>
            </div>
            <div className="book-title">{book.title}</div>
            <div className="book-authors">{book.authors ? book.authors.join(', '): ''}</div>
          </div>
          </li>
        </div>
      )
  }
}

export default Book