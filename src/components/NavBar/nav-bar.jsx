import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";

export const NavBar = ({ user, onLogout }) => {
  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand href="#home">MyFlix-App</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link>
              <Link to={`/`}>Home</Link>
            </Nav.Link>

            {user ? (
              <Nav.Link>
                <Link to={`/profile`}>Profile</Link>
              </Nav.Link>
            ) : null}

            {/* <NavDropdown title="Dropdown" id="basic-nav-dropdown">
              <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">
                Another action
              </NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.4">
                Separated link
              </NavDropdown.Item>
            </NavDropdown> */}
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
