import React, { Component } from 'react';
import './App.css';
import NavLink from "reactstrap/es/NavLink";
import NavItem from "reactstrap/es/NavItem";
import classnames from 'classnames';
import Nav from "reactstrap/es/Nav";
import TabContent from "reactstrap/es/TabContent";
import Row from "reactstrap/es/Row";
import Col from "reactstrap/es/Col";
import TabPane from "reactstrap/es/TabPane";
import { Table } from 'reactstrap';


export default class App extends React.Component {
 
  state ={currentTab: '1'}

  toggle(tab) {
    if (this.state.currentTab !== tab) {
      this.setState({
        currentTab: tab
      });
    }
  }

  
  render() {
    return (
        <div className='App'>
          <Nav tabs>
              <NavItem>
                <NavLink
                    className={classnames({ active: this.state.currentTab === '1' })}
                    onClick={() => { this.toggle('1'); }}
                >
                  Categories
                </NavLink>
              </NavItem>

            <NavItem>
              <NavLink
                  className={classnames({ active: this.state.currentTab === '2' })}
                  onClick={() => { this.toggle('2'); }}
              >
                Books
              </NavLink>
            </NavItem>

            <NavItem>
              <NavLink
                  className={classnames({ active: this.state.currentTab === '3' })}
                  onClick={() => { this.toggle('3'); }}
              >
                Authors
              </NavLink>
            </NavItem>


          </Nav>

          <TabContent className='TabContent' currentTab={this.state.currentTab}>
            <TabPane  tabId="1">
              <Row>
                <Col  lg="12">
                  <Table >
                    <thead >
                    <tr className='TabContent'>
                      <th >ID</th>
                      <th>Name</th>
                      <th>Actions</th>

                    </tr>
                    </thead>
                    <tbody>
                    <tr className='TabContent'>
                      <th scope="row">1</th>
                      <td>Mark</td>
                      <td>
                        <button type="button" className="btn btn-danger">Delete</button> {" "}
                        <button type="button" className="btn btn-success">Edit</button>
                      </td>
                    </tr>
                    <tr className='TabContent'>
                      <th scope="row">2</th>
                      <td>Jacob</td>
                      <td><button type="button" className="btn btn-danger">Delete</button> {" "}
                        <button type="button" className="btn btn-success">Edit</button></td>

                    </tr>
                    <tr className='TabContent'>
                      <th scope="row">3</th>
                      <td>Larry</td>
                      <td><button type="button" className="btn btn-danger">Delete</button> {" "}
                        <button type="button" className="btn btn-success">Edit</button></td>

                    </tr>
                    </tbody>
                  </Table>
                </Col>
              </Row>
            </TabPane>

            <TabPane tabId="2">
              <Row>
                <Col lg="12">
                  <h4>Tab 2 Contents</h4>
                </Col>
              </Row>
            </TabPane>

            <TabPane tabId="3">
              <Row>
                <Col lg="12">
                  <h4>Tab 3 Contents</h4>
                </Col>
              </Row>
            </TabPane>

          </TabContent>
        </div>
    );
  }
}
// export default App;
