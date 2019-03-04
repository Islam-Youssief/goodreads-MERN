import React, { Component } from 'react';
import {Route ,Link} from "react-router-dom";
import Cookies from 'universal-cookie';

export default class Nav extends Component {
    
  constructor(props) {
      super(props);
      this.state = {
        searchValue: '',
      }
    }
  
    logout = () => {
      new Cookies().remove("token");
      window.location = "http://localhost:3000/";
    }
  
    componentDidMount() {
      let cookies = new Cookies();
      if (!cookies.get('token')) {
        window.location = "http://localhost:3000/";
      }
    }
  
    updateSearch = (event) => {
      console.log(event.target.value);
      this.setState({
        searchValue: event.target.value,
      })
    }
  
    searchForResult = (event) => {
      window.location = "http://localhost:3000/search/" + this.state.searchValue;
    }
  
    render() {
        return (
<>
          <div className='container-fluid navIBack '>
          <nav className="mb-1 navIBack navbar navbar-expand-lg navbar-dark brown lighten-1">
            <a className="navbar-brand" href="http://localhost:3000/home">GoodReads</a>
            <div className="collapse navbar-collapse" id="navbarSupportedContent-555">
              <ul className="navbar-nav mr-auto">
                <li className="nav-item active">
                  <a className="nav-link" href="http://localhost:3000/home">Home
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="http://localhost:3000/categories/">
                    Categories
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="http://localhost:3000/books/">Books</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="http://localhost:3000/authors/">Authors</a>
                </li>
                <li className="nav-item moveinput" style={{width: 300}}>
                  <input className="form-control" type="text"
                         placeholder="Search" aria-label="Search"
                         onChange={this.updateSearch}
                         value={this.state.searchValue}
                  />
                </li>
                <li className="nav-item ">
                  <button style={{background: "none", border: "none"}}
                          className="nav-link"
                          onClick={this.searchForResult}
                  >Search
                  </button>
                </li>
              </ul>

              <ul className="navbar-nav ml-auto nav-flex-icons moveAvata">

                <li className="nav-item avatar">
                  <a className="nav-link p-0" href="#">
                    <img src="2.png"
                         className="rounded-circle z-depth-0" alt="avatar " height="35"/>
                  </a>
                </li>
                <li className="nav-item ">
                  <a className="nav-link" href="#">
                    {new Cookies().get("username")}
                  </a>
                </li>
                <li className="nav-item " width="25">
                  <button style={{background: "none", border: "none"}}
                          className="nav-link"
                          onClick={this.logout}>Logout
                  </button>
                </li>
              </ul>
            </div>
          </nav>
        </div>

<div>
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
          </div>
  </>
        );
  
    }
}












