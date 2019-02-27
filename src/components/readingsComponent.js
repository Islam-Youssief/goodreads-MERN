import React, { Component } from 'react';
import DataTable from 'react-data-table-component';
//import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';
// import Dropdown from 'react-dropdown'
// import 'react-dropdown/style.css'
// var DropdownButton =require('react-bootstrap/DropdownButton');
// var Dropdown = require("react-bootstrap-dropdown");
import Dropdown from './dropdown'
import { Table } from 'reactstrap';
import { Nav, NavItem, NavLink } from 'reactstrap';

import { Button, ButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';



var ReactBsTable = require('react-bootstrap-table');
var BootstrapTable = ReactBsTable.BootstrapTable;
var TableHeaderColumn = ReactBsTable.TableHeaderColumn;


var style={
    float: 'left'
}

export default class readings extends Component {

    constructor(props) {
        super(props);
      this.state = {
        data: [{
            cover: 'image',
            name: 'book',
            author: 'ahmed',
            avgRate: 'good',
            rating: 'vGood',
            shelves: '15'
        }, {
            cover: 'image',
            name: 'book',
            author: 'ahmed',
            avgRate: 'good',
            rating: 'vGood',
            shelves: '15'
        }, {
            cover: 'image',
            name: 'book',
            author: 'ahmed',
            avgRate: 'good',
            rating: 'vGood',
            shelves: '15'
        }],

        theme: null,
        dropdownOpen: false,
        value: 'coconut'

    }
    
        // this.handleChange = this.handleChange.bind(this);
    
      }

    
    // toggleDropdown = () => {
    //     this.setState({ dropdownOpen: !this.state.dropdownOpen });
    // }

    // resetTheme = evt => {
    //     evt.preventDefault();
    //     this.setState({ theme: null });
    // }

    // chooseTheme = (theme, evt) => {
    //     evt.preventDefault();
    //     this.setState({ theme });
    // }


    // handleChange(event) {
    //     this.setState({value: event.target.value});
    //   }

    render() {

        const { theme, dropdownOpen } = this.state;
        return (
            <>
{/* 
            <div className={style}>
            <Nav vertical>
          <NavLink href="#">Link</NavLink> <NavLink href="#">Link</NavLink> <NavLink href="#">Another Link</NavLink> <NavLink disabled href="#">Disabled Link</NavLink>
        </Nav>
            </div> */}
                <div >
                    <Dropdown />
                </div>
                <div>

                    {/* <DataTable
                    title="Arnold Movies"
                    columns={columns}
                    data={this.state.data}
                /> */}

                    <BootstrapTable data={this.state.data} striped hover version='4'>
                        <TableHeaderColumn isKey dataField='cover'> Cover</TableHeaderColumn>
                        <TableHeaderColumn dataField='name'> Name</TableHeaderColumn>
                        <TableHeaderColumn dataField='author'> Author</TableHeaderColumn>
                        <TableHeaderColumn dataField='avgRate'> Avg Rate</TableHeaderColumn>
                        <TableHeaderColumn dataField='rating'> Rating</TableHeaderColumn>
                        <TableHeaderColumn dataField='shelves' > shelves</TableHeaderColumn>
                    </BootstrapTable>
{/* <div className={style}>
                               

                               
                    <Table striped >
                        <thead><tr><th>Cover</th><th>Name</th><th>Author</th>
                            <th>Avg Rate</th><th>Rating</th><th>shelves</th>
                        </tr></thead>
                        <tbody>{this.state.data.map((item, index) => (
                            <tr key={index + 1}>

                                <th size="sm">{item.cover}</th>
                                <th size="sm">{item.name}</th>
                                <th size="sm">{item.author}</th>
                                <th size="sm">{item.avgRate}</th>
                                <th size="sm">{item.rating}</th>
                                <th size="sm"> <select value={this.state.value} onChange={this.handleChange}>
                                    <option value="volvo">Read</option>
                                    <option value="saab">Reading</option>
                                    <option value="mercedes">Want to Read</option>
                                    
                                </select></th>
                            </tr>

                        ))}</tbody>
                    </Table>
                    </div > */}
                </div>
            </>
        )
    }
}

