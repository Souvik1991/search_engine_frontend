import React, {Component} from 'react';

import SearchBar from "../components/search-bar";
import Book from "../components/book";

require('../static/css/base.css');

class Search extends Component{
    constructor(props){
        super(props);
        this.state = {
            books: []
        };
        this.addBook = this.addBook.bind(this);
    }

    addBook(selectedBook){
        this.setState({
            books: [...this.state.books, ...selectedBook]
        })
    }

    render(){
        return (
            <div className="container">
                <SearchBar callback={this.addBook}/>
                <div className="hr"></div>
				<div className="flex-container flex-start wrap">
					{
						this.state.books.map((el, index) => (
							<Book data={el} key={index}/>
						))
					}
				</div>
            </div>
        )
    }
}

export default Search;