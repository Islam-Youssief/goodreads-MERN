import React from 'react';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import Cookies from "universal-cookie";

function LoginUser(data) {
    console.log(JSON.stringify(data));
    return fetch('http://localhost:4000/users/login/', {
      body: JSON.stringify(data),
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
      },
    }).then(response =>
        response.json()
    ).catch(error => {
        console.log('Error');
    })
  }

class UserLogin extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
          email: '',
          password: '',
        };
        this.hundleLogin = this.hundleLogin.bind(this);
    }

    handleUpdateEmail = (event) => {
        console.log(event.target.value);
        this.setState({
          email: event.target.value
        });
    }
    

    handleUpdatePassword = (event) => {
        console.log(event.target.value);
        this.setState({
          password: event.target.value
        });
    }
    hundleLogin() {
      LoginUser({
        'email': this.state.email,
        'password': this.state.password,
      }).then(data => {
          console.log(data);
        if (data.token) {
          let cookies = new Cookies();
          cookies.set('token', data.token, {path: '/'});
          cookies.set('username', data.name, {path: '/'});
          cookies.set('currentUser', data.currentUser, {path: '/'});
          window.location = "http://localhost:3000/home";
        } else {
            alert("invalid email or password");
          window.location = "http://localhost:3000/";
        }
      });
  }

    render() {
        return (
            <div className='container-fluid' >
                <div className='row UsrLogin'  >
                
            
                <FormGroup className=" mb-2 mr-sm-2 mb-sm-0">
                    <Input type="name" name="name"
                           placeholder="Enter your email "
                           value={this.state.email}
                           onChange={this.handleUpdateEmail}/>
                </FormGroup>
                <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
                    <Input type="password" name="password"
                           placeholder="Enter your password"
                           value={this.state.password}
                           onChange={this.handleUpdatePassword}/>
                </FormGroup>
                <Button onClick={this.hundleLogin}>Login</Button>
              
                </div>
            </div>
        );
    }
}
export default UserLogin;
