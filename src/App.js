import React, { Component } from 'react';
import logo from './logo.svg';
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import readings from "./components/readingsComponent";
import categoryList from "./components/categoryComponent";
import booksList from "./components/booksComponent";
import authorsList from "./components/authorComponent";
import categoryId from "./components/categoryId";
import bookId from "./components/bookId";
import authorId from "./components/authorId";
import admin from "./components/admin";
import ex from "./components/ex";






class App extends Component {

 
  render() {
    return (
<>

      <Router>
        
        <div className='App'>
        
        
          <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <Link to="/" className="navbar-brand">Home</Link>
            <div className="collpase navbar-collapse">
              <ul className="navbar-nav mr-auto">
                <li className="navbar-item">
                  <Link to="/categories" className="nav-link">categories</Link>
                </li>
                <li className="navbar-item">
                  <Link to="/books" className="nav-link">books</Link>
                </li>
                <li className="navbar-item">
                  <Link to="/authors" className="nav-link">authors</Link>
                </li>
              </ul>
            </div>
          </nav>
          <br />
          
          <Route path='/' exact component={readings} />

          <Route path='/categories' exact component={categoryList} />
          <Route path='/books'exact component={booksList} />
          <Route path='/authors' exact component={authorsList} />
          {/* <Route path='/ex' component={ex} /> */}
          <Route path='/categories/:id' component={categoryId} />
          <Route path='/books/:id' component={bookId} />
          <Route path='/authors/:id' component={authorId} />


      


        </div>
      </Router>

      <Router>
       
       <Route path='/admin' component={admin} />

      
     </Router>

</>
    );
  }
}

export default App;
