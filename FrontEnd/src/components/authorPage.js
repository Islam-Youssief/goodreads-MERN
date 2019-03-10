import React, { Component } from 'react';
import Cookies from "universal-cookie";
import '../assets/css/authorPage.css'
// css file
// import '../Styles/bookprofile.css';

function GetAuthor(data) {
  return fetch('http://localhost:4000/authors/'+data)
      .then(response =>
      response.json())
}
/********************************************************************/
class AuthorProfile extends Component {
  constructor(props) {
    super(props);
    this.state={
      currentAuthor : '',
      authorId : this.props.match.params.id,
    };
  }

  componentDidMount(){
    let cookies = new Cookies();
    if (!cookies.get('token')) {
      window.location = "http://localhost:3000/";
    }

    GetAuthor(this.state.authorId).then((data) => {
      console.log(data);
      this.setState({
        currentAuthor: data,
      });
    })
  }

  render() {

    return (
        <div className="container-fluid">
        
          <div className="row AuthorProfile">
            <div className="col_trainings authorImg">
              <div className="Img">
                  <img style={{width:200, height:200}}
                       src={"http://localhost:4000/"+this.state.currentAuthor.photo}
                       alt="Card image cap"/>
              </div>
            </div>
            <div className="col_downloads authorInfo">
              <h1>{this.state.currentAuthor.firstName + " " + this.state.currentAuthor.lastName}</h1>
              <h3>{(""+this.state.currentAuthor.dateOfBirth).substr(0, 10)}</h3>
            </div>
          </div>
        </div>
    );
  }
};

export default AuthorProfile;

