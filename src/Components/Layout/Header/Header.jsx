import "./Header.css";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { useNavigate} from "react-router-dom";
import { useState, useEffect} from 'react';
import jwt_decode from "jwt-decode";

const Header = () => {

  const navigate = useNavigate();
  const token = localStorage.getItem("jwt");
  // console.log("Token:", token);

  const [roles, setRoles] = useState([]);
  const [user, setUser] = useState();
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [decodedToken, setDecodedToken] = useState(null);

  useEffect(() => {
    try {
      if (token) {
        const decodedToken = jwt_decode(token);
        // console.log("Decoded Token:", decodedToken);
        setDecodedToken(decodedToken);
  
        // Extract user roles and store in the state
        const userRoles = decodedToken && decodedToken.role ? [decodedToken.role] : [];
        setRoles(userRoles);
  
        // Extract user information, including the username, and store in the state
        const user = decodedToken && decodedToken.data ? decodedToken.data : null;
        setUser(user);
      } else {
        setDecodedToken(null); // Set user to null if no token is available
        setRoles([]); // Set roles to an empty array if no token is available
        setUser(null); // Set user to null if no token is available
      }
    } catch (error) {
      // console.error("Error decoding JWT token:", error);
      setDecodedToken(null); // Set user to null in case of an error
      setRoles([]); // Set roles to an empty array in case of an error
      setUser(null); // Set user to null in case of an error
    }
  }, [token]);
  

  // Decode the JWT token to get the user information
  // console.log("User object:", user);
  // console.log("Username:", user && user.username);

  const handleLogOut = () => {
    localStorage.removeItem("jwt");
    setIsLoggedIn(false);
    navigate("/login");
  };

    const [searchUser, setSearchUser] = useState("");
    const [searchUserResults, setSearchUserResults] = useState([]);
 
    const handleSearchUser = (event) => {
      event.preventDefault();
      const searchQuery = searchUser;

      fetch(`http://localhost:3001/api/users?search=${searchQuery}`, {
      method: "GET",
      headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    })
    .then((response) => response.json())
    .then((data) => {
      setSearchUserResults(data.data); // Update the search results state with the fetched data
    })
    .catch((error) => {
      // console.error("Error fetching patients:", error);
      setSearchUserResults([]); // If there is an error, set the search results to an empty array
    });
  }

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
                <>
                <Nav.Link href="#" onClick={handleLogOut} className="menu">Déconnexion</Nav.Link>
                    {user && user.username && (
                      <Navbar.Text className="username"> 
                        <span>Bonjour {user.username}!</span>
                      </Navbar.Text>
                    )}
              </>
              )
              }
            </Nav>
      
            <Nav>
              {token === null?
                (
                  <>
                    <NavDropdown title="Menu" id="collasible-nav-dropdown">
                      <NavDropdown.Item href="/about-us" className="dropdown">A propos</NavDropdown.Item>
                      <NavDropdown.Item href="/mobile" className="dropdown">Application mobile</NavDropdown.Item>
                      <NavDropdown.Item href="/fees" className="dropdown">Tarifs</NavDropdown.Item>
                      <NavDropdown.Item href="/delivery" className="dropdown">Livraisons</NavDropdown.Item>
                    </NavDropdown>
                    <Nav.Link href="/" className="menu">Accueil</Nav.Link>
                    <Nav.Link href="/assistance" className="menu">Assistance</Nav.Link>
                  </>
                ):(
                  <>
                    <NavDropdown title="Menu" id="collasible-nav-dropdown">
                      <NavDropdown.Item href="/about-us" className="dropdown">A propos</NavDropdown.Item>
                      <NavDropdown.Item href="/mobile" className="dropdown">Application mobile</NavDropdown.Item>
                      <NavDropdown.Item href="/fees" className="dropdown">Tarifs</NavDropdown.Item>
                      <NavDropdown.Item href="/delivery" className="dropdown">Livraisons</NavDropdown.Item>
                    </NavDropdown>
                      {/* Display content based on user roles */}
                      {roles.includes("pharmacist") && (
                        <Nav.Link href="/pharmacy" className="menu">Pharmacien</Nav.Link>
                      )}
                      {roles.includes("physician") && (
                        <Nav.Link href="/physician" className="menu">Médecin</Nav.Link>
                      )}
                      {roles.includes("patient") && (
                        <Nav.Link href="/patient" className="menu">Patient</Nav.Link>
                      )}
                      {roles.includes("admin") && (
                      <>
                        <Nav.Link href="/admin" className="menu">Admin</Nav.Link>
                        <Nav.Link href="/patient" className="menu">Patient</Nav.Link>
                        <Nav.Link href="/physician" className="menu">Médecin</Nav.Link>
                        <Nav.Link href="/pharmacy" className="menu">Pharmacien</Nav.Link>
                      </>
                      )}
                    <Nav.Link href="/" className="menu">Accueil</Nav.Link>
                    <Nav.Link href="/assistance" className="menu">Assistance</Nav.Link>
                  </>
                )
              }
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
    </div>
  )
};

export default Header;