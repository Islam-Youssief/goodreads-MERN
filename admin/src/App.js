import React, { Component } from 'react';
import logo from './logo.svg';
import Modal from 'react-modal';
import { Table } from 'reactstrap';

import { TabContent, TabPane, Nav, NavItem, NavLink, Card, Button, CardTitle, CardText, Row, Col } from 'reactstrap';
import classnames from 'classnames';



function Form(props) {



  return <div>


    <label>Name:</label><br />
    <input type="text" onChange={props.getName} value={props.value} /><br />


    <button onClick={props.addCategory}>Add Category</button>
  </div>
}

class App extends Component {


  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      category: [{

        name: "sara"
      }, {

        name: "rahma"
      }, {

        name: "alaa"
      }],

      books: [{
        photo: 'photo',
        name: 'ArtBook',
        categoryId: 123,
        authorId: 87

      }],

      authors:[ {
        photo: 'photo',
        firstName: 'Ahmed',
        lastName: 'Ali',
        DateOfBirth: '11-10-1970'
      }],
      newName: '',


      showComponent: false,

      currentTab: '1'

    }
  }




  toggle(tab) {
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab
      });
    }
  }

  deleteCategory = (index) => {
    const categories = [...this.state.category];
    categories.splice(index, 1);
    this.setState({
      category: categories
    })
  }


  deleteBook = (index) => {
    const books = [...this.state.books];
    books.splice(index, 1);
    this.setState({
      books: books
    })
  }

  deleteAuthor = (index) => {
    const authors = [...this.state.authors];
    authors.splice(index, 1);
    this.setState({
      authors: authors 
    })
  }


  showForm = () => {
    this.setState({
      showComponent: true
    })
  }

  closeForm = () => {
    this.setState({
      showComponent: false
    })
  }

  addCategory = () => {
    const categories = [...this.state.category]
    categories.push({ name: this.state.newName })
    this.setState({
      category: categories
    })
  }



  getName = (event) => {
    this.setState({
      newName: event.target.value
    })
  }

  render() {
    return (
      <>
        <div className="App">

          <Nav tabs>
            <NavItem>
              <NavLink
                className={classnames({ active: this.state.activeTab === '1' })}
                onClick={() => { this.toggle('1'); }}
              >
                categories
            </NavLink>
            </NavItem>
            <NavItem>
              <NavLink
                className={classnames({ active: this.state.activeTab === '2' })}
                onClick={() => { this.toggle('2'); }}
              >
                books
            </NavLink>
            </NavItem>


            <NavItem>
              <NavLink
                className={classnames({ active: this.state.activeTab === '3' })}
                onClick={() => { this.toggle('3'); }}
              >
                authors
            </NavLink>
            </NavItem>
          </Nav>

          <TabContent activeTab={this.state.activeTab}>
            <TabPane tabId="1">
              <Row>
                <Col sm="12">



                  <div>

                    <Table striped >
                      <thead><tr><th>#</th><th>Name</th><th>Actions</th></tr></thead>
                      <tbody>{this.state.category.map((item, index) => (
                        <tr key={index + 1}>
                          <th scope="row" >{index + 1}</th>
                          <th size="sm">{item.name}</th>
                          <th><button>edit</button><button onClick={() => this.deleteCategory(index)}>delete</button></th></tr>

                      ))}</tbody>
                    </Table>


                    <button onClick={this.showForm}>Add Category</button>

                  </div>



                  <Modal
                    isOpen={this.state.showComponent}
                    contentLabel="Hello!">
                    <Form addCategory={this.addCategory} getName={this.getName}
                      value={this.state.newName}
                    />
                    <button onClick={this.closeForm}>Close</button>

                  </Modal>

                </Col>
              </Row>
            </TabPane>

            <TabPane tabId="2">
              <Row>
                <Col sm="6">
                  <div>

                    <Table striped >
                      <thead><tr><th>#</th><th>Photo</th><th>Name</th>
                      <th>CategoryId</th><th>AuthorId</th><th>Actions</th>
                      </tr></thead>
                      <tbody>{this.state.books.map((item, index) => (
                        <tr key={index + 1}>
                          <th scope="row" >{index + 1}</th>
                          <th size="sm">{item.photo}</th>
                          <th size="sm">{item.name}</th>
                          <th size="sm">{item.categoryId}</th>
                          <th size="sm">{item.authorId}</th>

                          <th><button>edit</button><button onClick={() => this.deleteBook(index)}>delete</button></th></tr>

                      ))}</tbody>
                    </Table>


                    <button onClick={this.showForm}>Add Book</button>
                  </div>
                  </Col>
            </Row>
          </TabPane>

              <TabPane tabId="3">
                <Row>
                  <Col sm="6">
                  <div>
                  <Table striped >
                      <thead><tr><th>#</th><th>Photo</th><th>firstName</th>
                      <th>lastName</th><th>BirthOfDate</th><th>Actions</th>
                      </tr></thead>
                      <tbody>{this.state.authors.map((item, index) => (
                        <tr key={index + 1}>
                          <th scope="row" >{index + 1}</th>
                          <th size="sm">{item.photo}</th>
                          <th size="sm">{item.firstName}</th>
                          <th size="sm">{item.lastName}</th>
                          <th size="sm">{item.DateOfBirth}</th>

                          <th><button>edit</button><button onClick={() => this.deleteAuthor(index)}>delete</button></th></tr>

                      ))}</tbody>
                    </Table>


                    <button onClick={this.showForm}>Add Author</button>
                  </div>

                  </Col>
                </Row>
              </TabPane>

         
         


        </TabContent>

            
          </div>
     </>
        );
      }
    }
    
    export default App;
