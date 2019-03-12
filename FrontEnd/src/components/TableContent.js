import React, {Component} from 'react';
import {Input, Table} from 'reactstrap';
import {Link} from "react-router-dom";
import Cookies from "universal-cookie";
import SideBar from "./sideBar";
import StarRating from "./rating";
import '../assets/css/allAuthors.css'

function GetBooks() {
    return fetch('http://localhost:4000/books/')
        .then(response => response.json())
}

function GetUser(data) {
    return fetch('http://localhost:4000/users/'+data)
        .then(response => response.json())
}  

function SetStatusReading(data) {
  console.log(data);
  return fetch('http://localhost:4000/users/current/books/', {
    method: 'PUT',
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
      "Authorization": new Cookies().get('token'),
    },
  }).then(response => response.json()
  ).catch(error => {console.log('Error');})
}

export default class TableContent extends Component {

  constructor(props) {
    super(props);
    this.allBooks = [];
    this.state = {
      allBooks: [],
      currentBooks: [],
    };
  }

  componentDidMount() {
    console.log(new Cookies().get("currentUser"));
    GetBooks().then((data) =>{
      this.allBooks = data;
      this.setState({
        currentBooks: data,
      })
    })
  }

  all = () => {
      this.setState({  currentBooks: this.allBooks,})
  }
  Read = () => {
    let currentUser = new Cookies().get("currentUser");
    console.log(currentUser._id);
    GetUser(currentUser._id).then((data) => {
      let books = data.selectedBooks;
      let newBooks = [];
      this.allBooks.map((book) => {
        books.map((selet)=>{
          if(selet.bookId === book._id){

            if(selet.shelve === "Read") {
              newBooks.push(book);
            }
          }
        })
      })
      this.setState({ currentBooks : newBooks,})
    })
  }
  CurrentlyReading = () => {
    let currentUser = new Cookies().get("currentUser");
    console.log(currentUser._id);
    GetUser(currentUser._id).then((data) => {
      let books = data.selectedBooks;
      let newBooks = [];
      this.allBooks.map((book) => {
        books.map((selet)=>{
          if(selet.bookId === book._id){

            if(selet.shelve === "Currently Reading")
              newBooks.push(book);
            
          }
        })
      })
      this.setState({
        currentBooks : newBooks,
      })
    })
  }

  WantToRead = () => {
    let currentUser = new Cookies().get("currentUser");
    console.log(currentUser._id);
    GetUser(currentUser._id).then((data) => {
      let books = data.selectedBooks;
      let newBooks = [];

      this.allBooks.map((book) => {
        books.map((selet)=>{
          if(selet.bookId === book._id){

            if(selet.shelve === "Want To Read") {
              newBooks.push(book);
            }
          }
        })
      })
      this.setState({currentBooks : newBooks,})
    })
  }

  handle_status_reading = (event) => {
    console.log(event.target.value);
    console.log(event.target.getAttribute("bookid"));
    SetStatusReading({
      'readingStatus': event.target.value,
      'bookId': event.target.getAttribute("bookid"),
      'userId': new Cookies().get("currentUser")._id,
    }).then((data)=>{
      console.log(data);
    })
  }

  render() {
    return (
        <div className="container-fluid card" >
          <div className="row">
            <div className="col-lg-3">
              <SideBar all={this.all} Read={this.Read}
                       CurrentlyReading={this.CurrentlyReading} WantToRead={this.WantToRead}/>
            </div>
            <div className="col-lg-9">
              <Table>
                <thead>
                <tr>
                  <th>#</th>
                  <th>Cover</th>
                  <th>Name</th>
                  <th>Author</th>
                  <th>Avg Rate</th>
                  <th>Rating</th>
                  <th>shelve</th>
                </tr>
                </thead>
                <tbody>
                  {this.state.currentBooks.map((book, index) =>
                    <tr>
                      <th scope="row">{index}</th>
                      <td>
                        <img src={"http://localhost:4000/"+book.photo}
                                     width="50" height="50" alt="error image"/>
                      </td>
                      <td>
                        <Link to={"/books/" + book._id}>
                          {book.name}
                        </Link>
                      </td>
                      <td>
                        <Link to={"/authors/" + book.authorId._id}>
                          {book.authorId.firstName + " " + book.authorId.lastName}
                        </Link>

                      </td>
                      <td>
                        {book.rate}
                      </td>
                      <td><StarRating/></td>
                      <td>
                        <Input width="50%" type="select"
                         name="select1" id="exampleSelect" bookid={book._id}
                         onChange={this.handle_status_reading}
                          >
                          <option value="Read">Read</option>
                          <option value="WantToRead">Want To Read</option>
                          <option value="CurrentlyReading">Currently Reading</option>
                        </Input>

                      </td>
                      </tr>
                  )}
                </tbody>
              </Table>
            </div>
          </div>
        </div>
    );
  }
}