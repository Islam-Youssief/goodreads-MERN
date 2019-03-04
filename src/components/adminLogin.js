import React, {Component} from 'react';
import '../Admin.css';
import Cookies from 'universal-cookie';

function LoginAdmin(data) {
  console.log(JSON.stringify(data));
  return fetch('http://localhost:4000/admin/', {
    body: JSON.stringify(data),
    method: 'POST',
    headers: {
      "Content-Type": "application/json",
    },
  }).then(response =>
      response.json()
  ).catch(error => {
      console.log('Error while getting data !..');
  })
}
/******************************************************************** */
class AdminLogin extends Component {

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
    LoginAdmin({
      'email': this.state.email,
      'password': this.state.password,
    }).then(data => {
      if (data.token) {
        let cookies = new Cookies();
        cookies.set('token', data.token, {path: '/'});
        window.location = "http://localhost:3000/control";
      } else {
        window.location = "http://localhost:3000/admin";
      }
    });
  }

  render() {
    return (
        <div className='container-fluid'>
          <div className="row">
            <div className=' offset-lg-3 col-lg-6 AdminPanelSection '>
              <h3>Admin Control Board</h3>
              <hr/>
                <div className="form-group">
                  <label htmlFor="exampleInputEmail1">Email</label>
                  <input type="email" className="form-control"
                         placeholder="email"
                         value={this.state.email}
                         onChange={this.handleUpdateEmail}/>
                </div>
                <div className="form-group">
                  <label htmlFor="exampleInputPassword1">Password</label>
                  <input type="password" className="form-control" id="exampleInputPassword1"
                         placeholder="Password"
                         value={this.state.password}
                         onChange={this.handleUpdatePassword}/>
                </div>
                <button type="submit" className="btn btn-primary" onClick={this.hundleLogin}>Login</button>

            </div>
          </div>
        </div>
    );
  }
}

export default AdminLogin;