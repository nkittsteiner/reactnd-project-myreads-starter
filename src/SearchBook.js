import React, { Component } from 'react'
import PropTypes from 'prop-types'
import sortBy from 'sort-by'
import { Link } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'

class SearchBook extends Component {

	static propTypes = {
    books: PropTypes.array.isRequired
	}

  state = {
    query: '',
    searchedBooks: []
  }

  bookExist(id, books){
    books
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
            console.log('savedBook', savedBook)
            if(savedBook !== undefined)
              return savedBook
            else{
              console.debug(savedBook, 'savedBook')
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

  updateBook = (event) => {
    let bookId = event.target.id
    let shelf = event.target.value
    this.props.onChangeShelf(bookId, shelf)
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
                <li key={book.id}>
                  <div className="book">
                    <div className="book-top">
                      <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${book.imageLinks.thumbnail})` }}></div>
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
                    <div className="book-authors">{book.authors}</div>
                  </div>
                </li>                
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