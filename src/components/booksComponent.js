import React, { Component } from 'react';
import { Card, CardImg, CardText, CardBody, CardTitle, CardSubtitle, Button} from 'reactstrap';
import { Container, Row, Col } from 'reactstrap';

import BookCards from "./bookCards";
//import BookCards from "./bookId";




export default class booksList extends Component {

    constructor(){
        super();
        this.state={
            books:[{
                id:1,
                bookName:"strong man",
                authorName:"Ahmed",
                rating: "very good",
                review: "this a very useful book, I recommend it to every body grt tired from life"
            },{
                id:2,
                bookName:"ships",
                authorName:"Yaser Magdy",
                rating: "very good",
                review: "this a very useful book, I recommend it to every body grt tired from life"

            },{
                id:3,
                bookName:"travel ",
                authorName:"Sara ali",
                rating: "very good",
                review: "this a very useful book, I recommend it to every body grt tired from life"

            },{
                id:4,
                bookName:"travel ",
                authorName:"Sara ali",
                rating: "very good",
                review: "this a very useful book, I recommend it to every body grt tired from life"

            }]
        }
    }
   

    render() {

        let bookCards= this.state.books.map((book,index) =>{
            return(
                <Col sm="3" key={index}>
                <BookCards books={book} />
            </Col>
            )
        })

        return (
          
            
                <Container fluid>
                    <Row sm="3">
                       {bookCards}
                    </Row>
                 
                </Container>
               

            
           
        );
    }
}

