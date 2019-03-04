import React, { Component } from 'react';
import CategoryCards from './bookCards'
import { Card, CardImg, CardText, CardLink, CardBody, CardTitle, CardSubtitle, Button} from 'reactstrap';
import NavBar from '../components/nav'

export default class CatId extends Component {

    render() {
        return (
            <div>
<NavBar/>

                <Card className="text-center" style={{width: 200}}  >
                    <CardImg top width="100%" src="https://placeholdit.imgix.net/~text?txtsize=33&txt=318%C3%97180&w=318&h=180" alt="Card image cap" />


                    <CardBody>
                        <CardLink href="">bookName</CardLink>
                        <CardLink href=""> author</CardLink>

                    </CardBody>


                </Card>



            </div>
        );
    }
}

