import React , {Component} from 'react';
import {Table} from "reactstrap";
import Cookies from "universal-cookie";
import Link from "react-router-dom/es/Link";
import '../assets/css/allAuthors.css'

function GetCategories() {
    return fetch('http://localhost:4000/categories/')
        .then(response =>
        response.json())
  }
/******************************************* */  
export default class Categories extends Component {

    constructor(props) {
        super(props);
        this.state={
            categories : [],
        };
    }

    componentDidMount(){
      let cookies = new Cookies();
      if (!cookies.get('token')) {
        window.location = "http://localhost:3000/";
      }
      GetCategories()
      .then(data => {
        this.setState({
            categories: data,
        })
      });
    }

    render() {
        
        return (
            <div className="card" style={{'textAlign': "center"}}>

              <Table>
                <thead>
                <tr>
                  <h2 style={{'color':'gray'}}>Categories Names</h2> 
                  
                </tr>
                </thead>
              <thead>
              {this.state.categories.map((category , index) =>
                  <tr>
                      <th key={index}>
                        <Link to={"/categories/" + category._id + "/" + category.name}>
                          {category.name}
                        </Link>
                      </th>
                  </tr>)}
              </thead>
            </Table>
        </div>

        );
    }
}
