import React, { Component } from 'react';
import './App.css';
import {Route ,Link} from "react-router-dom";
import AdminLogin from "./components/adminLogin"
import AdminControl from "./components/adminControl";
import UserLogin from "./components/userLogin";
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
          <Route path="/" exact component={UserLogin}/>
          <Route path="/" exact component={SignUp}/>
          
          <Route path='/home' exact component={readings} />
          <Route path='/categories' exact component={categoryList} />
          <Route path='/books'exact component={booksList} />
          <Route path='/authors' exact component={authorsList} />
          <Route path='/categories/:id' component={categoryId} />
          <Route path='/books/:id' component={bookId} />
          <Route path='/authors/:id' component={authorId} />

            {/*user login*/}
            <Route path="/login" component={UserLogin}/>
            {/* Those routes are just for the admin*/}
            <Route path="/adminLogin" component={AdminLogin}/>
            <Route path="/admin" exact component={AdminControl}/> 
            
      


        </div>
      </Router>

     
</>
    );
  }
}

export default App;
