import React, { Component } from 'react';
import { Container, Row, Col } from 'reactstrap';
import AuthorCard from "./authorCards";
export default class authorsList extends Component {
    constructor(){
        super();
        this.state={
            authors:[ {
                id:1,
                photo: 'photo',
                firstName: 'Ahmed',
                lastName: 'Ali',
                DateOfBirth: '11-10-1970'
              },
              {
                id:2,
                photo: 'photo',
                firstName: 'Ahmed',
                lastName: 'Ali',
                DateOfBirth: '11-10-1970'
              },
              {
                id:3,
                photo: 'photo',
                firstName: 'Ahmed',
                lastName: 'Ali',
                DateOfBirth: '11-10-1970'
              },
              {
                id:4,
                photo: 'photo',
                firstName: 'Ahmed',
                lastName: 'Ali',
                DateOfBirth: '11-10-1970'
              }]
        }
    }
   
    render() {
        let authorCard= this.state.authors.map((author,index) =>{
            return(
                <Col sm="3" key={index}>
                <AuthorCard authors={author}/>
            </Col>
            )
        })
        return (
            
            <Container fluid>
            <Row sm="3">
               {authorCard}
            </Row>
         
        </Container>
        );
    }
}

