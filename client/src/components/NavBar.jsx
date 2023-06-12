import React from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Button from "react-bootstrap/Button";
import "../css/NavBar.css"

function NavBar() {
  return (
    <div>
      <Navbar className="color-nav" bg="dark" expand="lg">
        <Container>
          <Navbar.Brand className="neon brand-title" href="/">MakerPunks</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              {/* <Nav.Link  className="navLink" href="/Manifesto">Manifesto</Nav.Link> */}
              <Button className="post-button" variant="outline-info" href="/About">
                About
              </Button>
              <Button className="post-button" variant="info" href="/CreatePost">
                Post a Project
              </Button>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
}

export default NavBar;
