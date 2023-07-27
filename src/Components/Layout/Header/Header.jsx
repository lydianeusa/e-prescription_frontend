import "./Header.css";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { useNavigate} from "react-router-dom";
import { useState} from 'react';

const Header = () => {

  const navigate = useNavigate();
  const token = localStorage.getItem("jwt");
  const [isLoggedIn, setIsLoggedIn] = useState(true); 

  const handleLogOut = () => {
    localStorage.removeItem("jwt");
    setIsLoggedIn(false);
    navigate("/login");
  };

  return (
    <div>
    <header>
      <Navbar collapseOnSelect expand="lg" variant="dark" className="custom-navbar">
        <Container>
          <Navbar.Brand href="/"><img src="/img/e-ordo-12ter.png" alt=""/></Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto">
              {token === null ?
              (
                <>
                  <Nav.Link href="/login" className="menu">Connexion</Nav.Link>
                  <Nav.Link href="/sign-up" className="menu">S'inscrire</Nav.Link>
                </>
              ):(
                <Nav.Link href="#" onClick={handleLogOut}>Déconnexion</Nav.Link>
              )
              }
            </Nav>
      
            <Nav>
              <NavDropdown title="Menu" id="collasible-nav-dropdown">
                <NavDropdown.Item href="/about-us" className="dropdown">A propos</NavDropdown.Item>
                <NavDropdown.Item href="/mobile" className="dropdown">Application mobile</NavDropdown.Item>
                <NavDropdown.Item href="/fees" className="dropdown">Tarifs</NavDropdown.Item>
                <NavDropdown.Item href="/delivery" className="dropdown">Livraisons</NavDropdown.Item>
              </NavDropdown>
              <Nav.Link href="/" className="menu">Accueil</Nav.Link>
              <Nav.Link href="/physician" className="menu">Médecin</Nav.Link>
              <Nav.Link href="/pharmacy" className="menu">Pharmacien</Nav.Link>
              <Nav.Link href="/patient" className="menu">Patient</Nav.Link>
              <Nav.Link href="/assistance" className="menu">Assistance</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
    </div>
  )
};

export default Header;