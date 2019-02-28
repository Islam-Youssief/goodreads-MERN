import React from 'react';

function BookAuthor(props) {
    return (
      <div>
        <div className="author_book">
          <div className="review">
            <img src="2.jpg" alt="error" width="100" height="100"/><br/>
          </div>
          <div className="review">
            <h6>Book Name</h6>
            <span className="fa fa-star checked"></span>
            <span className="fa fa-star checked"></span>
            <span className="fa fa-star checked"></span>
            <span className="fa fa-star"></span>
            <span className="fa fa-star"></span>
          </div>
        </div>
        <div className="author_book">
          <select>
            <option value="1">Currently Read</option>
            <option value="2">Want To Read</option>
            <option value="3">Read</option>
          </select>
          <br/>
          <span className="fa fa-star checked"></span>
          <span className="fa fa-star checked"></span>
          <span className="fa fa-star checked"></span>
          <span className="fa fa-star"></span>
          <span className="fa fa-star"></span>
        </div>
      </div>
    );
  }


export default function AuthorsOfBooks(props) {
    return (
      <div>
        <h3>Author Of The Books</h3>
        <ul>
          <li>
            <BookAuthor />
          </li>
          <li>
            <BookAuthor />
          </li>
        </ul>
      </div>
    );
  }