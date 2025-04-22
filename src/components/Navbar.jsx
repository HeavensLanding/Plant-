// src/components/Navbar.jsx
import { Navbar, Nav, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import '../Navbar.css'; // Custom styles

function AppNavbar() {
  return (
    <Navbar expand="lg" className="lux-navbar" variant="dark">
      <Container>
        <Navbar.Brand as={Link} to="/" className="lux-brand">
          🌿 Planté
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link as={Link} to="/" className="lux-link">Home</Nav.Link>
            <Nav.Link as={Link} to="/my-plants" className="lux-link">My Plants</Nav.Link>
            <Nav.Link as={Link} to="/add" className="lux-link">Add Plant</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default AppNavbar;
