import React, { Component } from 'react';
import logo from './logo.svg';
import Modal from 'react-modal';
import { Table } from 'reactstrap';


function Form (props){
  return <div>
   

    <label>Name:</label><br/>
    <input type="text" onChange={props.getName} value={props.value}/><br/> 
 
    
    <button onClick={props.addCategory}>Add Category</button>
    </div>
}

class App extends Component {
   
  state={
    category : [{
      
      name:"sara"
    }, {
      
      name:"rahma"
    },{
      
      name:"alaa"
    }], 

    showComponent: false,
  
    newName:''
    
  }

  deleteCategory=(index)=>{
    const categories= [...this.state.category];
    categories.splice(index,1);
    this.setState({
      category:categories
    })
  }

  showForm= ()=>{
    this.setState({
      showComponent: true
    })
  }
   
  closeForm=()=>{
    this.setState({
      showComponent:false
    })
  }

  addCategory=()=>{
    const categories=[...this.state.category]
    categories.push({ name:this.state.newName})
    this.setState({
      category:categories
    })
  }

  

  getName=(event)=>{
    this.setState({
      newName: event.target.value
    })
  }
  
  render() {
    return (
      <>
      <div className="App">
        <Table striped >
          <thead><tr><th>#</th><th>Name</th><th>Actions</th></tr></thead>
          <tbody>{this.state.category.map((item, index)=>(
            <tr key={index+1}>
            <th scope="row" >{index+1}</th>
            <th size="sm">{item.name}</th>
            <th><button>edit</button><button onClick={()=>this.deleteCategory(index)}>delete</button></th></tr>
            
         ))}</tbody>
        </Table>
        <button onClick={this.showForm}>add</button>
       
        </div>
        <Modal
        isOpen={this.state.showComponent}
        contentLabel="Hello!">
        <Form addCategory={this.addCategory} getID={this.getID} getName={this.getName} 
        value={this.state.newName}
        /> 
        <button onClick={this.closeForm}>Close</button>
          
        </Modal>
          
     </>
    );
  }
}

export default App;
