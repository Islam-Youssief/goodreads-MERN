import React from 'react';

export default function Book(props) {
    return (
      <div>
        <div className="div-left-book">
          <img src="2.jpg" alt="error" width="150" height="170"/><br/>
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
        <div className="div-left-book">
          <h3>Book Name</h3>
          <a href="localhost:3000">Book Author</a><br/>
          <a href="localhost:3000">Category Name</a>
          <br/>
          <span className="fa fa-star checked"></span>
          <span className="fa fa-star checked"></span>
          <span className="fa fa-star checked"></span>
          <span className="fa fa-star"></span>
          <span className="fa fa-star"></span>
          <p>
            more info info info info info info info 
            info info info info info info info info 
            info info info info info info info info 
          </p>
        </div>
      </div>
    );
  }