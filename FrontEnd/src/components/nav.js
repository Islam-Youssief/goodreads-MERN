import React, { Component } from 'react';
import {Link} from "react-router-dom";
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
          

<div style={{background:'#d4c1ab'}}>
<nav className="navbar navbar-expand-lg navbar-light " >
            <Link to="/" className="navbar-brand"  >GoodReads</Link>
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

                <li className="nav-item moveinput" style={{marginLeft:300,width: 450}}>
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
                <li className="nav-item " width="25" style={{marginRight:30}}>
                  <button style={{borderRadius:35,background:"none"}}
                          className="nav-link"
                          onClick={this.logout}>Logout
                  </button>
                </li>
              </ul>



            </div>
          </nav>
          </div>
  </>
        );
  
    }
}












