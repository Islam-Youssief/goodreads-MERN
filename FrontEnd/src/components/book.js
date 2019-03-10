import React ,{Component} from 'react';
import { Card, CardBody, CardTitle } from 'reactstrap';
import Cookies from "universal-cookie";
import {Link} from "react-router-dom";

function GetBooks() {
    return fetch('http://localhost:4000/books/')
        .then(response =>
        response.json())
  }
/******************************************* */
  class Books extends Component {

  constructor(props) {
    super(props);
    this.state={
        books : [],
    };
  }

  componentDidMount(){

    let cookies = new Cookies();
    if (!cookies.get('token')) {
      window.location = "http://localhost:3000/";
    }

    GetBooks()
    .then(data => {
      this.setState({
          books: data,
      });
    });
  }

  render() {
    return (
        <div className="card">
        <center>
          <h2 style={{'color':'gray'}}>Books Names</h2> 
          {this.state.books.map((book , index) =>
            <div className="thumb" key={index}>
            <Card>
              <img style={{width:300, height:310}}
                   src={"http://localhost:4000/"+book.photo}
                   alt="Card image cap"/>
              <CardBody>
                <CardTitle>
                  <Link to={'/books/'+book._id}>
                   <h3>{book.name} </h3>
                  </Link>
                </CardTitle>
              </CardBody>
            </Card>
            </div>
          )}
          </center>
        </div>
    );
  }
}

export default Books;
