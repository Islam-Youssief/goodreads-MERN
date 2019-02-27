import React, { Component } from 'react';
import classnames from 'classnames';

import Modal from 'react-modal';
import { Table } from 'reactstrap';


function Form(props) {



    return <div>
  
  
      <label>Name:</label><br />
      <input type="text" onChange={props.getName} value={props.value} /><br />
  
  
      <button onClick={props.addCategory}>Add Category</button>
    </div>
}

export default function AuthorTab (props) {

    
    
    

    
        return (
<>
            <div>

            <Table striped >
                      <thead><tr><th>#</th><th>Photo</th><th>firstName</th>
                      <th>lastName</th><th>BirthOfDate</th><th>Actions</th>
                      </tr></thead>
                      <tbody>{props.author.map((item, index) => (
                        <tr key={index + 1}>
                          <th scope="row" >{index + 1}</th>
                          <th size="sm">{item.photo}</th>
                          <th size="sm">{item.firstName}</th>
                          <th size="sm">{item.lastName}</th>
                          <th size="sm">{item.DateOfBirth}</th>

                          <th><button>edit</button><button onClick={() => props.deleteAuthor(index)}>delete</button></th></tr>

                      ))}</tbody>
                    </Table>
            </div>
</>
        );
    
}