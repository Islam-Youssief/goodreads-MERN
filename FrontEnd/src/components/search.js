import React from 'react';
import {ListGroup, ListGroupItem} from 'reactstrap';
import Cookies from "universal-cookie";
import {Link} from "react-router-dom";

function GetMatched(data) {
    console.log(JSON.stringify(data));
    return fetch('http://localhost:4000/search/', {
      body: JSON.stringify(data),
      method: 'POST',
      headers: {"Content-Type": "application/json",},
    }).then(response => response.json()
    ).catch(error => { console.log('Error!');})
  }

export default class Example extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      matchedBooks: [],
    };
  }

  componentDidMount() {

    let cookies = new Cookies();
    if (!cookies.get('token')) {
      window.location = "http://localhost:3000/";
    }

    GetMatched({
      'searchValue': this.props.match.params.value
    }).then((data)=> {
      console.log(data);
      this.setState({
        
        
        matchedBooks: data.matchedBooks
      })
    })
  }

  render() {
    return (
        <div>
          <h1> Matched Results For Your Search : </h1>
          <ListGroup>
            <h4>Books :~ </h4>
            {this.state.matchedBooks.map((book, index)=>
              <ListGroupItem key={index}>
                <Link to={"/books/" + book._id}>
                  {book.name}
                </Link>
              </ListGroupItem>
            )}
          </ListGroup>
        </div>
    );
  }
}
