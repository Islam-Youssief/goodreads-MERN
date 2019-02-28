import React from 'react';

export default function SignUp(props) {
    return (
      <div>
        <form>
          <br></br><br></br>
          New here? Create a free account!
          <br></br><br></br>
          <input name="fname" type="text" placeholder="Enter Your First Name" />
          <br></br><br></br>
          <input name="lname" type="text" placeholder="Enter Your last Name" />
          <br></br><br></br>
          <input name="email" type="email" placeholder="Enter Your Email" />
          <i className="fas fa-user"></i>
          <br></br><br></br>
          <input name="pass1" type="password" placeholder="Enter Your password" />
          <i className="fas fa-unlock"></i>
          <br></br><br></br>
          <input name="pass2" type="password" placeholder="retype your password" />
          <i className="fas fa-unlock"></i>
          <br></br><br></br>
          <input name="image" type="file" placeholder="upload your image" />
          <i className="fas fa-upload"></i>
          <br></br><br></br>
        
          <button type = "submit" >Signup</button>
        </form>
      </div>
    );
  }