import React, { Component } from 'react';
import { ListGroup,ListGroupItem } from 'reactstrap';
import NavBar from '../components/nav'


export default class categoryList extends Component {

    state={
        category : [{
          id:1,
            name:"science"
          }, {
            id:2,
            name:"Art"
          },{
            id:3,
            name:"Math"
          }], 
      
    }

    render() {
        return (
            <div>
                 <NavBar/>
                <ListGroup className="text-center">

                    
                    {this.state.category.map((item, index)=>(
                        <ListGroupItem color="success" tag="a" href={"/category/"+ item.id} action>
                        {item.name}
                        </ListGroupItem>
                    ))}
                    
                    
                </ListGroup>;
          </div>
        );
    }
}




