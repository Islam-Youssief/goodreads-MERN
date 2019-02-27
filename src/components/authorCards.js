import React, { Component } from 'react';
import { Card, CardImg, CardText, CardBody, CardTitle, CardSubtitle, Button, CardLink, CardBlock } from 'reactstrap';

export default class bookCards extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>

                <Card className="text-center" >
                    <CardImg top width="100%" src="https://placeholdit.imgix.net/~text?txtsize=33&txt=318%C3%97180&w=318&h=180" alt="Card image cap" />


                    <CardBody>
                        <CardLink href={"/authors/" + this.props.authors.id}>{this.props.authors.firstName + " "+ this.props.authors.lastName }</CardLink>

                    </CardBody>


                </Card>



            </div>
        )
    }

}

