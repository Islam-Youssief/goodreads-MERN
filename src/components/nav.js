import React, { Component } from 'react';
import {Route ,Link} from "react-router-dom";


export default class Nav extends Component {

    render() {
        return (
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
        );
    }
}












