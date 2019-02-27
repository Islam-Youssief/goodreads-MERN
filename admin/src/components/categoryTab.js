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

export default function CategoryTab (props) {

    
    
    

    
        return (
<>
            <div>

            <Table striped >
              <thead><tr><th>#</th><th>Name</th><th>Actions</th></tr></thead>
              <tbody>{props.cat.map((item, index) => (
                <tr key={index + 1}>
                  <th scope="row" >{index + 1}</th>
                  <th size="sm">{item.name}</th>
                  <th><button>edit</button><button onClick={() => props.deleteCategory(index)}>delete</button></th></tr>

              ))}</tbody>
            </Table>

            </div>
            {<button onClick={props.showForm}>Add Category</button> }

         



          { <Modal
            isOpen={props.showComponent}
            contentLabel="Hello!">
            <Form addCategory={props.addCategory} getName={props.getName}
              value={props.newName}
            />
            <button onClick={props.closeForm}>Close</button>

          </Modal> }  

</>
        );
    
}