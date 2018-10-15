import React from 'react';
import { Container, Row, Card, Col, Form } from 'react-bootstrap';
import "./Login.css";
import { Auth } from "aws-amplify";
import LoaderButton from "./LoaderButton";
import { Link } from 'react-router-dom';
export default class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: false,
            email: "",
            password: ""
          };
    }
    validateForm() {
        return this.state.email.length > 0 && this.state.password.length > 0;
    }
    
    handleChange = event => {
        this.setState({
            [event.target.id]: event.target.value
        });
    }
    handleSubmit = async event => {
        event.preventDefault();
      
        this.setState({ isLoading: true });
      
        try {
          let user = await Auth.signIn(this.state.email, this.state.password);
          this.props.setUserProfile(user);
          this.props.userHasAuthenticated(true);
          this.props.history.push("/");
        } catch (e) {
          alert(e.message);
          this.setState({ isLoading: false });
        }
      }
    render() {
        return(
            <Container fluid>
                <Row className="justify-content-md-center">
                    <Col lg={4}>
                        <Card className="login-card">
                            <Card.Header>Login</Card.Header>
                            <Card.Body>
                                <Form className="login-form" onSubmit={this.handleSubmit}>
                                    <Form.Group controlId="email">
                                        <Form.Label>Email</Form.Label>
                                        <Form.Control type="email" autoFocus value={this.state.email} onChange={this.handleChange} />
                                    </Form.Group>
                                    <Form.Group controlId="password">
                                        <Form.Label>Password</Form.Label>
                                        <Form.Control type="password" value={this.state.password} onChange={this.handleChange} />
                                    </Form.Group>
                                    <Form.Group>
                                        <Link to="/login/reset">Forgot password?</Link>
                                    </Form.Group>
                                    <LoaderButton
                                    block
                                    disabled={!this.validateForm()}
                                    type="submit"
                                    isLoading={this.state.isLoading}
                                    text="Login"
                                    loadingText="Logging in…" />
                                </Form>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
        );
    }
}