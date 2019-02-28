import React, { Component } from 'react';
import './App.css';
import {Route ,Link} from "react-router-dom";
import AdminLogin from "./components/AdminLogin"
import AdminControl from "./components/AdminControl";
import Footer from "./components/Footer";
import UrsLogin from "./components/UsrLogin";

import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router} from "react-router-dom";
import readings from "./components2/readingsComponent";
import categoryList from "./components2/categoryComponent";
import booksList from "./components2/booksComponent";
import authorsList from "./components2/authorComponent";
import categoryId from "./components2/categoryId";
import bookId from "./components2/bookId";
import authorId from "./components2/authorId";
import SignUp from "./components/signup" 
class App extends Component {

 
  render() {
    return (
<>

      <Router>
        
        <div className='App'>
        
        
          <br />
          
          <Route path='/' exact component={readings} />

          <Route path='/categories' exact component={categoryList} />
          <Route path='/books'exact component={booksList} />
          <Route path='/authors' exact component={authorsList} />
          {/* <Route path='/ex' component={ex} /> */}
          <Route path='/categories/:id' component={categoryId} />
          <Route path='/books/:id' component={bookId} />
          <Route path='/authors/:id' component={authorId} />

          <Route path="/signup" component={SignUp}/>
            
          
            <Route path="/adminLogin" component={AdminLogin}/>
            <Route path="/admin" exact component={AdminControl}/> 
            <Route path="/footer" component={Footer}/>
            <Route path="/login" component={UrsLogin}/>
      


        </div>
      </Router>

     
</>
    );
  }
}

export default App;
