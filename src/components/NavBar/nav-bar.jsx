import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";

/**
 * component to display the navigation bar
 * @param {Object} - user
 * @param {Function} - onLogout
 * @returns {JSX.Element}
 */
export const NavBar = ({ user, onLogout }) => {
  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand href="/">MyFlix-App</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            {user ? (
              <Nav.Link>
                <Link to={`/profile`}>Profile</Link>
              </Nav.Link>
            ) : null}
          </Nav>
          {!user ? (
            <>
              <Link to={`/login`} style={{ paddingRight: "5px" }}>
                Login
              </Link>

              <Link to={`/signup`}>Sign up</Link>
            </>
          ) : (
            <>
              <Link to={`/`} onClick={onLogout}>
                Log out
              </Link>
            </>
          )}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};
