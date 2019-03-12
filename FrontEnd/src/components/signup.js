import React from 'react';
import {
  Button,Form,FormGroup,Label,Input,
  Col,Row,Card,CardText,CardTitle,ListGroupItem,ListGroup
}from 'reactstrap';
import Cookies from "universal-cookie";
import swal from 'sweetalert';

 function SignUpUser(data) {
  return fetch('http://localhost:4000/users/signup/', {
    body: JSON.stringify(data),
    method: 'POST',
    headers: {
      "Content-Type": "application/json",
    },
  }).then(response => 
   response.json()
  ).catch(error => { console.log('Error');})
}

function GetBooks() {
  return fetch('http://localhost:4000/books/')
      .then(response =>
      response.json())
}

function GetCategories() {
  return fetch('http://localhost:4000/categories/')
      .then(response =>
      response.json())
}
function GetAuthors() {
  return fetch('http://localhost:4000/authors/')
      .then(response =>
      response.json())
}
/****************************************************************** */

class UsrSignUp extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      books: [],
      authors: [],
      categories: [],
    };
    this.hundleSignUp = this.hundleSignUp.bind(this);
  }

  componentDidMount() {
    GetBooks()
        .then(data => {
          this.setState({
            books: data,
          })
        });
    GetCategories()
        .then(data => {
          this.setState({
            categories: data,
            newBook: {...this.state.newBook, categoryId: data[0]._id},
          });
        });
    GetAuthors()
        .then(data => {
          this.setState({
            authors: data,
            newBook: {...this.state.newBook, authorId: data[0]._id},
          })
        });

    let cookies = new Cookies();
    if (cookies.get('token')) {
        window.location = "http://localhost:3000/home";
    }
  }

  handleUpdateFirstName = (event) => {
    console.log(event.target.value);
    this.setState({
      firstName: event.target.value
    });
  }
  handleUpdateLastName = (event) => {
    console.log(event.target.value);
    this.setState({
      lastName: event.target.value
    });
  }
  handleUpdateEmail = (event) => {
    console.log(event.target.value);
    this.setState({
      email: event.target.value
    });
  }
  handleUpdatePassword = (event) => {
    console.log(event.target.value);
    this.setState({
      password: event.target.value
    });
  }

  hundleSignUp() {

    SignUpUser({
      'firstName': this.state.firstName,
      'lastName': this.state.lastName,
      'email': this.state.email,
      'password': this.state.password,
    }).then(data => {
      console.log(data);
      if(! (data.email && data.firstName && data.lastName && data.password ))
        swal({
        title: "Invalid Data !", 
        text : "Please enter your info for registeration !",
        icon : "error",
        showLoaderOnConfirm: true,
        }).then(function(){console.log("fail to add account!")})


      else if(data.email === ("Email already exists"))
        swal({
        title: "Invalid Data !", 
        text : "This Email is already existed in our db",
        icon : "error",
        showLoaderOnConfirm: true,
        }).then(function(){console.log("fail to add account!")})

      else if(data.firstName && data.firstName.msg)
        swal({
        title: "Invalid Data !", 
        text : "Minmum character for first name is 4 characters !",
        icon : "error",
        showLoaderOnConfirm: true,
        }).then(function(){console.log("fail to add account!")})
        
        
      else if(data.lastName && data.lastName.msg)
        swal({
        title: "Invalid Data !", 
        text : "Minmum character for last name is 4 characters !",
        icon : "error",
        showLoaderOnConfirm: true,
        }).then(function(){console.log("fail to add account!")})

      else
      swal({
            title: "~~ Information ~~", 
            text : "Your Account was created successfully !", 
            icon : "success",
            showLoaderOnConfirm: true,
            }).then(function(){console.log("added acount!")})
    });
  }

  render() {
    return (
        <div className='container-fluid'>

          <div className='row'>
            <div className='col-lg-7 col-md-7 col-sm-7 col-xs-7 cola '>
              <Row>
                <Col sm="6" className='marg'>
                  <Card body>
                    <CardTitle>Popular Authors</CardTitle>
                    <ListGroup>
                      {this.state.authors.slice(0, 3).map((author, index) =>
                        <ListGroupItem key={index}>{author.firstName + " " + author.lastName}</ListGroupItem>
                      )}
                    </ListGroup>
                  </Card>
                </Col>
                <Col sm="6">
                  <Card body>
                    <CardTitle>Popular Books</CardTitle>
                    <ListGroup>
                      {this.state.books.slice(0, 3).map((book, index) =>
                        <ListGroupItem key={index}>{book.name}</ListGroupItem>
                      )}
                    </ListGroup>
                  </Card>
                </Col>
              </Row>
              <Row>
                <Col sm="6">
                  <Card body>
                    <CardTitle>Popular Categories</CardTitle>
                    <ListGroup>
                      {this.state.categories.slice(0, 3).map((category, index) =>
                        <ListGroupItem key={index}>{category.name}</ListGroupItem>
                      )}
                    </ListGroup>
                  </Card>
                </Col>

              </Row>
            </div>
            <div className='col-lg-4 col-md-4 col-sm-4 col-xs-4 '>
              <h4>~ Join us now , you will never regret it ~ </h4>
              <hr/>
              <Form>
                <FormGroup>
                  <Input type="name" name="fname" placeholder="First name"
                         value={this.state.firstName} pattern='[A-Za-z\\s]*'
                         onChange={this.handleUpdateFirstName}/>
                </FormGroup>
                <FormGroup>
                  <Input type="name" name="lname" placeholder="Last name"
                         value={this.state.lastName} pattern='[A-Za-z\\s]*'
                         onChange={this.handleUpdateLastName}/>
                </FormGroup>
                <FormGroup>
                  <Input type="email" name="email" placeholder="E-mail"
                         value={this.state.email}
                         onChange={this.handleUpdateEmail}/>
                </FormGroup>
                <FormGroup>
                  <Input type="password" name="password" placeholder="password "
                         value={this.state.password}
                         onChange={this.handleUpdatePassword}/> </FormGroup>

                <Button onClick={this.hundleSignUp}> Sign up</Button>
              </Form>
            </div>

          </div>
        </div>
    );
  }
}

export default UsrSignUp;
