import React, { Component } from 'react';
import { Card, CardImg, CardText, CardBody, CardTitle, CardSubtitle, Button, CardLink, CardBlock } from 'reactstrap';

import Dropdown from './dropdown'



export default class bookId extends Component {

    
   
    
    render() {
        return (
            <div style={{ marginBottom: 0 }}>

                
                <div style={{ width: 200 }}>
                    <Card >

                        <CardBody>
                            <CardImg top width="100%" src="https://placeholdit.imgix.net/~text?txtsize=33&txt=318%C3%97180&w=318&h=180" alt="Card image cap" />

                        </CardBody>
                    </Card>
                    </div>
                    <div >
                        <Dropdown/>
                    </div>
               

                


                {/* <h1>{this.props.match.params.id}</h1>
             {this.props.children} */}

                <div >
                    <Card >

                        <CardBody>
                            <CardTitle>Review</CardTitle>

                            <CardText>Some quick example text to build on the card title and make up the bulk of the card's content.</CardText>

                        </CardBody>
                    </Card>

                </div>
            </div>
        );
    }
}

