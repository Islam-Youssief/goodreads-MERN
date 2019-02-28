import React , { Componant } from 'react';
import ReactDOM from 'react-dom';
import '../App.css';


//Register Box 
class RegisterBox extends React.Component {

  constructor(props) {
    super(props);
    this.state = {};
  }

  submitRegister(e) {}

  render() {
    return (
      <div className="inner-container">
        <div className="header">
          Register
        </div>
        <div className="box">

          <div className="input-group">
            <label htmlFor="firstName">First Name</label>
            <input
              type="text"
              name="firstName"
              className="login-input"
              placeholder="Enter Your first name"/>
          </div>
          <div className="input-group">
            <label htmlFor="lastName">Last Name</label>
            <input
              type="text"
              name="lastName"
              className="login-input"
              placeholder="Enter Your last name"/>
          </div>

          <div className="input-group">
            <label htmlFor="email">Email</label>
            <input type="text" name="email" className="login-input" placeholder="Email"/>
          </div>

          <div className="input-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              name="password"
              className="login-input"
              placeholder="Password"/>
          </div>

          <div className="input-group">
            <label htmlFor="repassword">Retype Password</label>
            <input
              type="password"
              name="repassword"
              className="login-input"
              placeholder="Retype Password"/>
          </div>
          <div className="input-group">
            <label htmlFor="image">Image</label>
            <input
              type="file"
              name="image"
               accept="image/*"
              placeholder="Upload your image"/>
          </div>
          <div className="input-group">
            <label htmlFor="isAdmin">Are you an admin</label>
            <input
              type="checkbox"
              
              name="isAdmin"
               
              />
          </div>
          <button
            type="button"
            className="login-btn"
            onClick={this
            .submitRegister
            .bind(this)}>Register</button>
        </div>
      </div>
    );
  }
}

export default RegisterBox;