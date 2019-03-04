import React, { Component } from 'react';
import { Card, CardImg, CardText, CardBody, CardTitle, CardSubtitle, Button, CardLink, CardBlock , Input } from 'reactstrap';

import NavBar from './nav'


export default class AuthorId extends Component {
    
    render() {
        return (
            <div className="container-fluid">
            <NavBar/>
            <div className="row authorPage">
                <div className="col_trainings authorImg">
                    <div className="Img">
                        <Card>
                            <img width="100%" height="200px" src="https://placeholdit.imgix.net/~text?txtsize=33&txt=318%C3%97180&w=318&h=180" alt="Card image cap" />
                        </Card>
                    </div>
                    <div>
                      <br>
                      </br>

                      <br>
                      </br>
                    </div>
                </div>

                <div className="col_downloads authorData">
                    <h2> author name</h2>
                    <h2> by ====</h2>
                    <h2> cat ====</h2>
                    <p> avrage eveluation</p>
                    <CardText>
                       about the author about the author about the author about the author
                    </CardText>
                </div>
                <div >
                    <Card >

                        <CardBody>
                            <CardTitle>Review</CardTitle>
                            <div width="100px" >
                            <img width="30%" height="100px" src="https://placeholdit.imgix.net/~text?txtsize=33&txt=318%C3%97180&w=318&h=180" alt="Card image cap" />
                            </div>
                            
                            <div>
                            Some quick example text to build on the card title 
                            and make up the bulk of the card's content.
                            </div>

                        </CardBody>
                    </Card>

                </div>
            </div>


        </div>
        );
    }
}

