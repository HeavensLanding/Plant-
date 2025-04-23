// src/components/Navbar.jsx
import { Navbar, Nav, Container } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import '../Navbar.css'; // your custom styles

function AppNavbar() {
  return (
    <Navbar expand="lg" className="lux-navbar" variant="dark">
      <Container>
        <Navbar.Brand as={NavLink} to="/" className="lux-brand">
          🌿 Planté
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto d-flex gap-3">
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive ? 'lux-link active' : 'lux-link'
              }
            >
              Home
            </NavLink>

            <NavLink
              to="/my-plants"
              className={({ isActive }) =>
                isActive ? 'lux-link active' : 'lux-link'
              }
            >
              My Plants
            </NavLink>

            <NavLink
              to="/add"
              className={({ isActive }) =>
                isActive ? 'lux-link active' : 'lux-link'
              }
            >
              Add Plant
            </NavLink>
            <NavLink
                to="/greenroom"
                className={({ isActive }) =>
                isActive ? 'lux-link active' : 'lux-link'
                }
            >
                 Greenroom
            </NavLink>
            <NavLink
                to="/seed-bucket"
                className={({ isActive }) =>
                isActive ? 'lux-link active' : 'lux-link'
                }
            >
                The Seed Bucket
            </NavLink>


          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default AppNavbar;
