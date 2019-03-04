import React , {Component} from 'react';
import Cookies from "universal-cookie";
import {
    Button, Form, FormGroup, Input, Label, Modal,
    ModalBody, ModalFooter,ModalHeader, Table
} from "reactstrap";

function GetBooks() {
    return fetch('http://localhost:4000/books/')
        .then(response =>
        response.json())
}
  
function GetAuthors() {
    return fetch('http://localhost:4000/authors/')
        .then(response =>
        response.json())
}

function GetCategories() {
    return fetch('http://localhost:4000/categories/')
        .then(response =>
        response.json())
  }

function AddBook(data)
{
    console.log(data);
    const formData = new FormData();
    formData.append('name', data.name);
    formData.append('categoryId', data.categoryId);
    formData.append('authorId', data.authorId);
    formData.append('photo', data.photo);

  return fetch('http://localhost:4000/books/', {
    method: 'POST',
    body: formData,
    headers: {
      "Authorization": new Cookies().get('token'),
    },
  }).then(response =>
      response.json()
  ).catch(error => {
      console.log('data will be send later');
  })
}
  
function EditBook(data) 
{
  console.log(data);
  const formData = new FormData();
  formData.append('name', data.name);
  formData.append('categoryId', data.categoryId);
  formData.append('authorId', data.authorId);
  formData.append('photo', data.photo);

  return fetch('http://localhost:4000/books/', {
    // body: JSON.stringify(data),
    method: 'POST',
    body: formData,
    headers: {
      "Authorization": new Cookies().get('token'),
    },
  }).then(response =>
      response.json()
  ).catch(error => {
      console.log('data will be send later');
  })
}
  
function DeleteBook(id)
{
    return fetch('http://localhost:4000/books/'+id, {
      method: 'DELETE',
      headers: {
        "Content-Type": "application/json",
        "Authorization": new Cookies().get('token'),
      },
    }).then(response =>
        response.json()
    ).catch(error => {
        console.log('data not deleted');
    })
  } 

/**************************************************************** */
class AddBookForm extends Component{

    constructor(props) {
        super(props);
        this.state={
            modalIsOpen: false,
            books: [],
            authors: [],
            newBook: {},
            categories: [],
        };
        this.handle_modal = this.handle_modal.bind(this);
        this.handling_modal = this.handling_modal.bind(this);
    }

    // get all catrogries
    handle_modal() {
        GetCategories()
              .then(data => {
                this.setState({
                    categories: data,
                    newBook: {...this.state.newBook, categoryId: data[0]._id},
                });
              }).then(() => {
                  GetAuthors()
                  .then(data => {
                    this.setState({
                        authors: data,
                        newBook: {...this.state.newBook, authorId: data[0]._id},
                    })
                  }).then(() => {
                      this.setState(prevState => ({
                        modal: !prevState.modal
                      }));
                  });
            });
    }

    // updating book
    handle_updateBook =(event)=>{
        console.log(event.target.name,event.target.value);
        if(event.target.name === "edit") {
            this.setState({
               newBook: JSON.parse(event.target.value),
            });
        }
        else if(event.target.name === "name") {
            this.setState({
                newBook: {...this.state.newBook, name: event.target.value,}
            });
        } else if(event.target.name === "category") {
            
            this.setState({
                newBook: {...this.state.newBook, categoryId: event.target.value,}
            });
        } else if(event.target.name === "author") {
            console.log(event.target.value);
            this.setState({
                newBook: {...this.state.newBook, authorId: event.target.value,}
            });
        } else if(event.target.name === "coverImage") {
            let path = event.target.files[0];
            console.log(path);
            this.setState({
                newBook: {...this.state.newBook, photo: path,}
            });
        }
    }
    // handle opening edit modal
    handling_modal(event) {
        this.handle_updateBook(event);
        this.setState(prevState => ({
            EditModal: !prevState.EditModal
        }));
    }
    // adding a book
    handle_addBook =()=>{
        AddBook(this.state.newBook).then(data => {
            GetBooks().then((data) => {
                this.setState({
                    books: data,
                    newBook :'',
                });
            })
        });
    }

    // handle editing a book
    handle_EditBook =()=>{
        EditBook(this.state.newBook).then(data => {
            GetBooks().then((data) => {
                this.setState({
                    books: data,
                    newBook :'',
                });
            })
        });
    }

    // deleting book
    deletRow = (index) =>{
        const books = [...this.state.books];
        DeleteBook(books[index.target.value]._id).then((data) => {
            GetBooks().then(data => {
                this.setState({
                    books: data,
                    newBook: "",
                });
            });
        });
    }

    componentDidMount(){
    // inialize getting all books
        GetBooks()
      .then(data => {
        this.setState({
            books: data,
        })
      });
    // inialize getting all catgories  
      GetCategories()
      .then(data => {
        this.setState({
            categories: data,
            newBook: {...this.state.newBook, categoryId: data[0]._id},
        });
      });
      // inialize getting all authors
      GetAuthors()
      .then(data => {
        this.setState({
            authors: data,
            newBook: {...this.state.newBook, authorId: data[0]._id},
        })
      });
    }

    render() {    
        return(
    <div>
        <button onClick={this.handle_modal} className='btn btn-info offset-lg-10  offset-md-10  offset-sm-10  offset-xs-10 add_category'>{this.props.title} +</button>
        <Modal isOpen={this.state.modal} toggle={this.handle_modal} className={this.props.className}>
        <ModalHeader toggle={this.handle_modal}>{this.props.title}</ModalHeader>
        <ModalBody>
        <Form>
            <FormGroup>
                <Label for="name">Book name</Label>
                <Input type="name" name="name" id="name"
                       placeholder="Book name" value={this.state.newBook.name}
                       onChange={this.handle_updateBook}/>
            </FormGroup>
            <FormGroup>
                <Label for="exampleSelect">Select Category</Label>
                <Input type="select" name="category" id="exampleSelect"
                       onChange={this.handle_updateBook}>
                    {this.state.categories.map((category, index) =>
                        <option value={category._id}>{category.name}</option>
                    )}
                </Input>
            </FormGroup>
            <FormGroup>
                <Label for="exampleSelect">Select Author</Label>
                <Input type="select" name="author" id="exampleSelect"

                       onChange={this.handle_updateBook}>
                    {this.state.authors.map((author, index) =>
                        <option value={author._id}>
                            {author.firstName +" "+ author.lastName}
                        </option>
                    )}
                </Input>
            </FormGroup>
            <FormGroup>
                <Label for="exampleFile">Upload Image</Label>
                <Input type="file" name="coverImage" id="exampleFile"
                       onChange={this.handle_updateBook}
                       />
            </FormGroup>
        </Form>
    </ModalBody>
    <ModalFooter>
        <Button color="primary" onClick={this.handle_modal}
                onClick={this.handle_addBook}>{this.props.title}</Button>{' '}
        <Button color="secondary" onClick={this.handle_modal}>
            {this.props.cancel}</Button>
    </ModalFooter>

</Modal>

<Modal isOpen={this.state.EditModal} toggle={this.handling_modal}
       className={this.props.className}>
    <ModalHeader toggle={this.handling_modal}>Edit Book</ModalHeader>
    <ModalBody>
         <Form>
            <FormGroup>
                <Label for="name">Edit Book name</Label>
                <Input type="name" name="name" id="name"
                       placeholder="Edit Book name"
                       value={this.state.newBook.name}
                       onChange={this.handle_updateBook}/>
            </FormGroup>
            <FormGroup>
                <Label for="exampleSelect">Edit Category</Label>
                <Input value={this.state.newBook.categoryId} type="select" name="category" id="exampleSelect"
                       onChange={this.handle_updateBook}>
                    {this.state.categories.map((category, index) =>
                        <option value={category._id}>{category.name}</option>
                    )}
                </Input>
            </FormGroup>
            <FormGroup> 
                <Label for="exampleSelect">Edit Author</Label>
                <Input type="select" name="author" id="exampleSelect"
                       value={this.state.newBook.authorId}
                       onChange={this.handle_updateBook}>
                    {this.state.authors.map((author, index) =>
                        <option value={author._id}>
                            {author.firstName +" "+ author.lastName}
                        </option>
                    )}
                </Input>
            </FormGroup>
            <FormGroup>
                <Label for="exampleFile">Edit Image</Label>
                <Input type="file" name="coverImage" id="exampleFile"
                       onChange={this.handle_updateBook}       
                />
            </FormGroup>
        </Form>

    </ModalBody>
    <ModalFooter>
        <Button color="primary" onClick={this.handling_modal}
                onClick={this.handle_EditBook}>Edit</Button>{' '}
        <Button color="secondary" onClick={this.handling_modal}>Cancel</Button>
    </ModalFooter>
</Modal>
<Table>
    <thead>
    <tr>
        <th>ID</th>
        <th>Photo</th>
        <th>Name</th>
        <th>Category</th>
        <th>Author</th>
        <th>Actions</th>
    </tr>
    </thead>

    <thead>
    {this.state.books.map((book , index) =>
        <tr>
            <th>{index+1}</th>
            <th key={index}>
                <img src={"http://localhost:4000/"+book.photo} width="50" height="50" alt="book cover"/>
            </th>
            <th>{book.name}</th>
            <th>{book.categoryId.name}</th>
            <th>{book.authorId.firstName +" "+book.authorId.lastName}</th>
            <th>
                <button value={JSON.stringify(book)} type="button"
                        className="btn btn-info"
                        name="edit"
                        onClick={this.handling_modal}>Edit</button> {" "}
                <button value= {index} onClick={this.deletRow.bind(this)}
                    type="button" className="btn btn-danger">Delete</button> </th>
        </tr>)}

    </thead>
</Table>
</div>
        );
    }
}

export default AddBookForm;


