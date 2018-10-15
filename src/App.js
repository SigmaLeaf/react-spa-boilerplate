import React, { Component } from 'react';
import { Navbar, Nav, Button } from 'react-bootstrap';
import { Link, withRouter } from 'react-router-dom';
import { LinkContainer } from "react-router-bootstrap";
import './App.css';
import { Auth } from "aws-amplify";

// import MainNav from './MainNav';
import Routes from "./Routes";

class App extends Component {
  constructor(props) {
    super(props);
  
    this.state = {
      isAuthenticated: false,
      isAuthenticating: true,
      userProfile: {}
    };
  }
  componentWillMount() {
    this.getStateFromSessionStorage();
  }
  async componentDidMount() {
    try {
      await Auth.currentSession();
      this.userHasAuthenticated(true);
    }
    catch(e) {
      if (e !== 'No current user') {
        alert(e);
      }
    }
  
    this.setState({ isAuthenticating: false });
  }
  userHasAuthenticated = authenticated => {
    this.setState({ isAuthenticated: authenticated });
  }
  setUserProfile = user => {
    this.setState({ userProfile: user})
    sessionStorage.setItem('userProfile', JSON.stringify(this.state.userProfile));
  }
  getStateFromSessionStorage = () => {
    for (let key in this.state) {
      if (sessionStorage.hasOwnProperty(key)) {
        let value = sessionStorage.getItem(key);

        try {
          value = JSON.parse(value);
          this.setState({[key]: value});
        } catch (e) {
          this.setState({[key]: value});
        }
      }
    }
  }
  handleLogout = async event => {
    await Auth.signOut();
    sessionStorage.removeItem('userProfile');
    this.userHasAuthenticated(false);
    this.props.history.push("/login");
  }
  render() {
    const childProps = {
      isAuthenticated: this.state.isAuthenticated,
      userHasAuthenticated: this.userHasAuthenticated,
      setUserProfile: this.setUserProfile,
      userProfile: this.state.userProfile
    };
    return (
      !this.state.isAuthenticating &&
      <div className="App">
            <Navbar bg="light" expand="lg">
                <Navbar.Brand><Link to="/">Company XYZ</Link></Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
                <Nav>
                    {this.state.isAuthenticated
                      ? <React.Fragment>
                          <LinkContainer to="/settings">
                            <Button variant="light" className="nav-button">Settings</Button>
                          </LinkContainer>
                          <Button variant="light" className="nav-button" onClick={this.handleLogout}>Logout</Button>
                        </React.Fragment>
                      : <React.Fragment>
                          <LinkContainer to="/signup">
                              <Button variant="light" className="nav-button">Sign up</Button>
                          </LinkContainer>
                          <LinkContainer to="/login">
                              <Button variant="light" className="nav-button">Login</Button>
                          </LinkContainer>
                        </React.Fragment>
                    }
                </Nav>
                </Navbar.Collapse>
          </Navbar>
        <Routes childProps={childProps} />
      </div>
    );
  }
}

export default withRouter(App);
