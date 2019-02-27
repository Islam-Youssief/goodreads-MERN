import React, { Component } from 'react';
import logo from './logo.svg';
import Modal from 'react-modal';
import { Table } from 'reactstrap';


class App extends Component {

    constructor(props) {
        super(props);


       
    }  
    
    render(){
        return(
            <>
            <th scope="row" >{index + 1}</th>
                          <th size="sm">{item.name}</th>
                          <th><button>edit</button><button onClick={() => this.deleteCategory(index)}>delete</button></th>
</>
        )
    }
}