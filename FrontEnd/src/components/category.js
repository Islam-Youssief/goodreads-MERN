import React ,{Component} from 'react';
import {Card, CardBody,CardTitle} from 'reactstrap';
import Cookies from "universal-cookie";
import Link from "react-router-dom/es/Link";
import '../assets/css/allAuthors.css'


function GetBooks() {
    return fetch('http://localhost:4000/books/')
        .then(response => response.json())
  }

class CategoryBooks extends Component {

  constructor(props) {
    super(props);
    this.state={
        books : [],
        catId : this.props.match.params.id,
        catName: this.props.match.params.name,
    };
  }

  componentDidMount(){
    let cookies = new Cookies();
    if (!cookies.get('token')) {
      window.location = "http://localhost:3000/";
    }
    GetBooks()
    .then(data => {
      console.log(data);
      return data.filter((book) => {
          return book.categoryId._id === this.state.catId;
      });
    }).then(data => {
      console.log(data);
      this.setState({
          books: data,
      })
    });
  }

  render() {
    return (
        <div className="card">
            
          <h1>{this.state.catName}</h1>
          {this.state.books.map((book , index) =>
            <div className="thumb" key={index}>
            <Card>
              <img style={{width:200, height:100}}
                   src={"http://localhost:4000/"+book.photo}
                   alt="Card image cap"/>
              <CardBody>
                <CardTitle>
                  <Link to={"/books/" + book._id}>
                    {book.name}
                  </Link>
                 </CardTitle>
              </CardBody>
            </Card>
            </div>
          )}
        </div>
    );
  }
}

export default CategoryBooks;
