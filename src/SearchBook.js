import React, { Component } from 'react'
import PropTypes from 'prop-types'
import sortBy from 'sort-by'
import { Link } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import Book from './Book'

class SearchBook extends Component {

  static propTypes = {
    books: PropTypes.array.isRequired,
    onChangeShelf: PropTypes.func.isRequired
  }

  state = {
    query: '',
    searchedBooks: []
  }

  updateQuery = (query) => {
    this.setState({ query: query.trim() })
    //TODO: Fix bug when typing to fast, blocks text input.    
    if(query.length >= 3 ){
      BooksAPI.search(query, 20).then((data) => {
        if(data.error === 'empty query'){
          this.setState({ searchedBooks: [] })
        }
        else {
          let finalList = data.map(book => {            
            let savedBook = this.props.books.filter( x => x.id === book.id)[0]
            if(savedBook !== undefined)
              return savedBook
            else{
              let b = book
              b['shelf'] = 'none'
              return b
            }
            
          })
          this.setState({ searchedBooks: finalList.sort(sortBy('title')) })
        }
        
      })
    }
  }

  changeShelf = (bookId, to) => {
    this.props.onChangeShelf(bookId, to)
  }  


  render(){

    const { query } = this.state

    return(
          <div className="search-books">
            <div className="search-books-bar">
              <Link className="close-search" to='/'>Close</Link>
              <div className="search-books-input-wrapper">
                <input 
                  type="text" 
                  placeholder="Search by title or author"
                  value={query}
                  onChange={(event) => this.updateQuery(event.target.value)} />
              </div>
            </div>
            <div className="search-books-results">
              <ol className="books-grid">
              {(this.state.searchedBooks.length > 0) && this.state.searchedBooks.map((book) => (
                <div key={book.id}>
                  <Book book={book} onChangeShelf={this.changeShelf} />  
                </div>
              ))}
              {this.state.searchedBooks.length === 0 &&  (
                <div>No books found based on criteria</div>
                )}
              </ol>
            </div>
          </div>
    )
  }
  
}

export default SearchBook