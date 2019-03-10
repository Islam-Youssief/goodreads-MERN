import React, {Component} from 'react';
import Cookies from 'universal-cookie';
import {Input} from "reactstrap";


// islam
// import '../Styles/authorbook.css';

async function GetBooks() {
    const response = await fetch('http://localhost:4000/books/');
    return await response.json();
  }


/*********************************************** */
class AuthorBookProfile extends Component {

  constructor(props) {
    super(props);
    this.state = {
      authorBooks: [],
      authorId: this.props.match.params.id,
    };
  }

  componentDidMount(){
    let cookies = new Cookies();
    if (!cookies.get('token')) {
      window.location = "http://localhost:3000/";
    }

    GetBooks().then((data) => {
      let author_books = data.filter((book) => {
        return book.authorId._id === this.state.authorId;
      });
      console.log(author_books);
      this.setState({
        authorBooks: author_books,
      });
    })
  }

  render() {
    return (
        <div className=" BookInfo">
          <div className="HeaderBook">
          
            <h2>author's books</h2>
          </div>
          {this.state.authorBooks.map((book, index) =>
              <>
            <div className="row">
              <div key={index} className="col-md-1 col_trainings authorImg">
                <img style={{width:100, height:100}}
                     src={"http://localhost:4000/"+book.photo}
                     alt="Card image cap"/>
              </div>
              <div className="col-md-8 col_downloads">
                <h2>{book.name}</h2>
                <p>{"Book Rate:- " + book.rate}</p>
              </div>
              <div className="col-md-2 col_downloads">
                <Input style={{width: 140}} type="select" name="select1" id="exampleSelect">
                  <option>want to read</option>
                  <option>reading</option>
                  <option>read</option>
                </Input>
              </div>

            </div>
              <div>
              <hr style={{border:"1px solid white"}}/>
              </div>
            </>
          )}

        </div>
    );
  }
}

export default AuthorBookProfile;