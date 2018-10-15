import React from 'react';
import { Container, Row, Col, Card, Form } from 'react-bootstrap';
import LoaderButton from "./LoaderButton";
import { Auth } from "aws-amplify";
import './Signup.css';

export default class Signup extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: false,
            name: "",
            email: "",
            password: "",
            confirmPassword: "",
            confirmationCode: "",
            newUser: null
        };
    }
    validateForm() {
        return this.state.name.length > 0 && 
        this.state.email.length > 0 && 
        this.state.password.length > 0 &&
        this.state.password === this.state.confirmPassword;
    }
    validateConfirmationForm() {
        return this.state.confirmationCode.length > 0;
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
            const newUser = await Auth.signUp({
                username: this.state.email,
                password: this.state.password,
                attributes: {
                    name: this.state.name
                }
            });
            this.setState({
                newUser
            });
        } catch(e) {
            alert(e.message);
        }
        this.setState({ isLoading: false });
    }
    handleConfirmationSubmit = async event => {
        event.preventDefault();
        this.setState({ isLoading: true });
        try {
            await Auth.confirmSignUp(this.state.email, this.state.confirmationCode);
            await Auth.signIn(this.state.email, this.state.password);
            this.props.setUserProfile(this.state.newUser);
            this.props.userHasAuthenticated(true);
            this.props.history.push("/");
        } catch (e) {
            alert(e.message);
            this.setState({ isLoading: false });
        }
    }
    renderConfirmationForm() {
        return (
          <Form onSubmit={this.handleConfirmationSubmit}>
            <Form.Group controlId="confirmationCode" bsSize="large">
              <Form.Label>Confirmation Code</Form.Label>
              <Form.Control
                autoFocus
                type="tel"
                value={this.state.confirmationCode}
                onChange={this.handleChange}
              />
              <span>Please check your email for the code.</span>
            </Form.Group>
            <LoaderButton
              block
              bsSize="large"
              disabled={!this.validateConfirmationForm()}
              type="submit"
              isLoading={this.state.isLoading}
              text="Verify"
              loadingText="Verifying…"
            />
          </Form>
        );
    }
    renderForm() {
        return(
            <Form className="signup-form" onSubmit={this.handleSubmit}>
                <Form.Group controlId="name">
                    <Form.Label>Name</Form.Label>
                    <Form.Control type="text" autoFocus value={this.state.name} onChange={this.handleChange} />
                </Form.Group>
                <Form.Group controlId="email">
                    <Form.Label>Email</Form.Label>
                    <Form.Control type="email" value={this.state.email} onChange={this.handleChange} />
                </Form.Group>
                <Form.Group controlId="password">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" value={this.state.password} onChange={this.handleChange} />
                </Form.Group>
                <Form.Group controlId="confirmPassword">
                    <Form.Label>Confirm Password</Form.Label>
                    <Form.Control type="password" value={this.state.confirmPassword} onChange={this.handleChange} />
                </Form.Group>
                <LoaderButton
                block
                disabled={!this.validateForm()}
                type="submit"
                isLoading={this.state.isLoading}
                text="Sign up"
                loadingText="Signing up…" />
            </Form>
        )
    }
    render() {
        return(
            <Container fluid>
                <Row className="justify-content-md-center">
                    <Col lg={4}>
                        <Card className="signup-card">
                            <Card.Header>Sign up</Card.Header>
                            <Card.Body>
                                {this.state.newUser === null ? this.renderForm() : this.renderConfirmationForm()}
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
        )
    }
}