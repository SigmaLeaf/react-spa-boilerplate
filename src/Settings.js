import React from 'react';
import { LinkContainer } from "react-router-bootstrap";
import { Container, Row, Col } from 'react-bootstrap';
import LoaderButton from "./LoaderButton";
import './Settings.css'
export default class Settings extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    render() {
        const style = {
            token: {
                overflow: 'auto',
                overflowWrap: 'break-word',
            }
        }
        return(
            <Container>
                <div className="settings">
                    <Row className="justify-content-md-center">
                            <Col lg={6}>
                                    <div style={style.token}>
                                        <h5>Access Token:</h5> 
                                        <p>{this.props.userProfile.signInUserSession.accessToken.jwtToken}</p>
                                        <h5>ID Token:</h5> 
                                        <p>{this.props.userProfile.signInUserSession.idToken.jwtToken}</p>
                                        <h5>Refresh Token:</h5> 
                                        <p>{this.props.userProfile.signInUserSession.refreshToken.token}</p>
                                    </div>
                                </Col>
                            <Col lg={6}>

                                    {/* <LinkContainer to="/settings/email">
                                    <LoaderButton
                                        block
                                        text="Change Email"
                                    />
                                    </LinkContainer> */}
                                    <LinkContainer to="/settings/password">
                                    <LoaderButton
                                        block
                                        text="Change Password"
                                    />
                                    </LinkContainer>

                            </Col>

                    </Row>
                </div>
            </Container>
        );
    }
}