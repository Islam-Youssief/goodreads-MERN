import React, { Component } from 'react';
import { Card, CardImg, CardText, CardBody, CardTitle, CardSubtitle, Button, CardLink, CardBlock , Input } from 'reactstrap';
import NavBar from '../components/nav'

import Dropdown from './dropdown'



export default class BookId extends Component {

    
   
    
    render() {
        return (
            <div className="container-fluid">


            <NavBar/>
            <div className="row BookPage">
                <div className="col_trainings BookImg">
                    <div className="Img">
                        <Card>
                            <img width="100%" height="200px" src="https://placeholdit.imgix.net/~text?txtsize=33&txt=318%C3%97180&w=318&h=180" alt="Card image cap" />
                        </Card>
                    </div>
                    <div>
                        <Input width="50%" type="select" name="select1" id="exampleSelect">
                            <option>want to read</option>
                            <option>reading</option>
                            <option>read</option>
                        </Input>

                        <CardBody>
                            <p>user eveluation</p>
                        </CardBody>
                    </div>
                </div>

                <div className="col_downloads BookData">
                    <h2>book name</h2>
                    <h2>by ====</h2>
                    <h2>cat ====</h2>
                    <p>avrage eveluation</p>
                    <CardText>
                       about the book about the book about the book about the book
                    </CardText>
                </div>
                <div >
                    <Card >

                        <CardBody>
                            <CardTitle>Review</CardTitle>

                            <CardText>Some quick example text to build on the card title and make up the bulk of the card's content.</CardText>

                        </CardBody>
                    </Card>

                </div>
            </div>


        </div>
        );
    }
}

