import React, {Component} from 'react';
import {Nav, NavItem} from "reactstrap";
import Cookies from "universal-cookie";
class SideBar extends Component {

  constructor(props) {
    super(props);
    this.state = {
      bb : this.props,
    }
  }

  componentDidMount() {
    console.log(this.state.bb);
      let cookies = new Cookies();
      if (!cookies.get('token')) {
          window.location = "http://localhost:3000/";
      }
  }
  
                            
    render() {
        return (
            <Nav vertical>
                <NavItem>
                    <hr/>
                    <button  className="btn btn-info" style={{width:150}} onClick={this.props.all}>all</button>
                    <hr/>
                </NavItem>
                <NavItem>
                  <button  className="btn btn-info" style={{width:150}} onClick={this.props.Read}>Read</button>
                    <hr/>
                </NavItem>
                <NavItem>
                  <button  className="btn btn-info" style={{width:150}} onClick={this.props.CurrentlyReading}>Currently Reading</button>
                    <hr/>
                </NavItem>
                <NavItem>
                  <button className="btn btn-info" style={{width:150}} onClick={this.props.WantToRead}>Want to Read</button>
                  <hr/>
                </NavItem>
            </Nav>

        );
    }
}

export default SideBar;