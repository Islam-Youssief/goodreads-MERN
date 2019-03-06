import React from 'react';
import {Route ,BrowserRouter} from "react-router-dom";
import AdminLogin from "./components/adminLogin"
import AdminControl from "./components/adminDashboard";
import Nav from "./components/nav";
import UsrLogin from "./components/userLogin";
import UsrSignUp from "./components/signup";
import TableContent from "./components/TableContent";
import Books from "./components/book";
import BookProfile from "./components/bookPage";
import Authors from "./components/author";
import AuthorProfile from "./components/authorPage";
import AuthorBook from "./components/authorbookprofile";
import Categories from "./components/categories";
import Category from "./components/category";
import Search from "./components/search";
import './assets/css/users.css';


class App extends React.Component {

  render() {

    return (
        <BrowserRouter >
          <div className='App'>
            <Route path='/' exact component={UsrLogin}/>
            <Route path='/' exact component={UsrSignUp}/>
            

            <Route path='/home' exact component={Nav}/>
            <Route path='/home' exact component={TableContent}/>
            

            <Route path='/categories' exact component={Nav}/>
            <Route path='/categories' exact component={Categories}/>
            

            <Route path='/categories/:id/:name' exact component={Nav}/>
            <Route path='/categories/:id/:name' exact component={Category}/>
            

            <Route path='/books' exact component={Nav}/>
            <Route path='/books' exact component={Books}/>
            

            <Route path='/books/:id' exact component={Nav}/>
            <Route path='/books/:id' exact component={BookProfile}/>
            

            <Route path="/search/:value" exact component={Search}/>

            <Route path='/authors' exact component={Nav}/>
            <Route path='/authors' exact component={Authors}/>
            

            <Route path='/authors/:id' exact component={Nav}/>
            <Route path='/authors/:id' exact component={AuthorProfile}/>
            <Route path='/authors/:id' exact component={AuthorBook}/>
            

            <Route path="/Admin" exact component={AdminLogin} />
            <Route path="/dashboard" exact component={AdminControl}/>
          </div>
        </BrowserRouter>
    );
  }
}

export default App;
