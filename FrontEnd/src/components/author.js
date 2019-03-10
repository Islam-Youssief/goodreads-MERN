import React,{Component} from 'react';
import { Card,CardBody,CardTitle} from 'reactstrap';
import {Link} from "react-router-dom";
import Cookies from "universal-cookie";
import '../assets/css/allAuthors.css'

function GetAuthors() {
  return fetch('http://localhost:4000/authors/')
      .then(response => response.json())
}

class Authors extends Component {

  constructor(props) {
    super(props);
    this.state={
        authors : [],
    };
  }

  componentDidMount(){

    let cookies = new Cookies();
    if (!cookies.get('token')) {
      window.location = "http://localhost:3000/";
    }

    GetAuthors()
    .then(data => { this.setState({ authors: data,});
    });
  }

  render() {
    return (
        <div className="card">
        <center>
          <h2 style={{'color':'gray'}}>Authors Names</h2> 
          
          {this.state.authors.map((author , index) =>
            <div className="thumb" key={index}>
            <Card>
              <img style={{width:250, height:250}}
                   src={"http://localhost:4000/"+author.photo}
                   alt="Card image cap"/>
              <CardBody>
                <CardTitle>
                  <Link to={'/authors/'+author._id}>
                    <h3> {author.firstName + " " + author.lastName} </h3>
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

export default Authors;
