import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Book from './Book'

class Shelf extends Component {

  static propTypes = {
      title: PropTypes.string.isRequired,
      books: PropTypes.array.isRequired,
      onChangeShelf: PropTypes.func.isRequired
  }

  changeShelf = (bookId, to) => {
    this.props.onChangeShelf(bookId, to)
  }

  render(){

      const { title, books } = this.props
      return(
          <div>
            <div className="bookshelf">
              <h2 className="bookshelf-title">{title}</h2>
              <div className="bookshelf-books">            
                <ol className="books-grid">
                  {books.map((book) => (
                    <div key={book.id}>
                      <Book book={book} onChangeShelf={this.changeShelf} />    
                    </div>
                  ))}
                </ol>
              </div>
            </div>
          </div>
      )
  }
}

export default Shelf