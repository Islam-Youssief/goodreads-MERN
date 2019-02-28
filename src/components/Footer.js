import React , {Component} from 'react';
import {MDBCol, MDBContainer, MDBFooter, MDBRow} from "mdbreact";
class Footer extends Component {

    render() {
        return (
            <MDBFooter color="indigo" className="font-small pt-0 foot">
                <MDBContainer>
                    <MDBRow className="pt-5 mb-3 text-center d-flex justify-content-center">
                        <MDBCol md="2" className="b-3">
                            <h6 className="title font-weight-bold">
                                <a href="#!">Home</a>
                            </h6>
                        </MDBCol>
                        <MDBCol md="2" className="b-3">
                            <h6 className="title font-weight-bold">
                                <a href="#!">About us</a>
                            </h6>
                        </MDBCol>
                        <MDBCol md="2" className="b-3">
                            <h6 className="title font-weight-bold">
                                <a href="#!">Categories</a>
                            </h6>
                        </MDBCol>
                        <MDBCol md="2" className="b-3">
                            <h6 className="title font-weight-bold">
                                <a href="#!">Authors</a>
                            </h6>
                        </MDBCol>
                        <MDBCol md="2" className="b-3">
                            <h6 className="title font-weight-bold">
                                <a href="#!">Terms & Conditions</a>
                            </h6>
                        </MDBCol>
                    </MDBRow>
                    <hr className="rgba-white-light" style={{ margin: "0 15%" }} />
                </MDBContainer>
                <div className="footer-copyright text-center py-3">
                    <MDBContainer fluid>
                        &copy; {new Date().getFullYear()} Copyright:
                        <a href="/"> GoodReads</a>
                    </MDBContainer>
                </div>
            </MDBFooter>
        );
    }
}
export default Footer;