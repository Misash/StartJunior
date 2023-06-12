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
          <Navbar.Brand  className="neon" href="/">{"<StartJr/>"}</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              {/* <Nav.Link href="#link">About</Nav.Link> */}
              <Button variant="info" href="/CreatePost">Post a Job</Button>{" "}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
}

export default NavBar;
