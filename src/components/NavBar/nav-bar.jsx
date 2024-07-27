import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";

/**
 * Component to display the navigation bar.
 * @param {Object} props - The component's props.
 * @param {Object} props.user - The current user object.
 * @param {Function} props.onLogout - Callback function to handle user logout.
 * @returns {JSX.Element} The rendered component.
 */
function NavBar({ user, onLogout }) {
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
}
