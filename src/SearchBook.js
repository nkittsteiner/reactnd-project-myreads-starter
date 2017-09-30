import React, { Component } from 'react'
import PropTypes from 'prop-types'
import sortBy from 'sort-by'
import escapeRegExp from 'escape-string-regexp'

class SearchBook extends Component {

	static propTypes = {
    books: PropTypes.array.isRequired,
		onCloseSearch: PropTypes.func.isRequired
	}

  state = {
    query: ''
  }

  updateQuery = (query) => {
    this.setState({ query: query.trim() })
  }

  clearQuery = () => {
    this.setState({ query: '' })
  }  

	render(){

		const { books, onCloseSearch } = this.props
    const { query } = this.state

    let showingBooks

    if(query){
      const match = new RegExp(escapeRegExp(query), 'i')
      showingBooks = books.filter((book) => match.test(book.title) || match.test(book.authors))
    }
    else {
      showingBooks = books
    }    

    showingBooks.sort(sortBy('title'))

		return(
          <div className="search-books">
            <div className="search-books-bar">
              <a className="close-search" onClick={() => onCloseSearch()}>Close</a>
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
              {showingBooks.map((book) => (
                <li key={book.id}>
                  <div className="book">
                    <div className="book-top">
                      <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${book.imageLinks.thumbnail})` }}></div>
                      <div className="book-shelf-changer">
                        <select>
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
              </ol>
            </div>
          </div>			
		)
	}
	
}

export default SearchBook