import React, {useState, useEffect } from "react";
import { Link, useNavigate} from "react-router-dom";
import Header from "../../Layout/Header/Header";
import Footer from "../../Layout/Footer/Footer";


const FindAPatient = () => {


  const navigate = useNavigate();
  // Autorisation JWT
  useEffect(() => {
      const token = localStorage.getItem("jwt");
      if (!token) {
          navigate("/login");
          return;
      }
      // Décode le token JWT pour récupérer la date d'expiration
      const jwtData = token.split(".")[1];
      const decodedJwt = JSON.parse(atob(jwtData));
      const expirationTime = decodedJwt.exp * 1000; // Convertit la date d'expiration en millisecondes

      // Redirige vers la page de connexion lorsque le jeton expire
      const timeoutId = setTimeout(() => {
          navigate("/login");
      }, expirationTime - Date.now()); // Définit le délai en millisecondes avant la redirection

      // Nettoie le timeout lorsque le composant est démonté
      return () => clearTimeout(timeoutId);
  }, [navigate]);


  const [patient, setPatient] = useState(null);
  const [searchPatient, setSearchPatient] = useState("");
  const [showPatientInfo, setShowPatientInfo] = useState(false);
  const [noPatientFound, setNoPatientFound] = useState(false); // Add state for no patient found

        // Récupère le jeton JWT stocké dans le local storage   
        const token = localStorage.getItem("jwt");

  const handleSearch = (e) => {
    e.preventDefault();

    fetch(`http://localhost:3001/api/patients?search=${searchPatient}`, {
        headers: { "Content-Type": "application/json" ,
        "Authorization": `Bearer ${token} ${localStorage.getItem("roles")}`
        }
    })
      .then((response) => response.json())
      .then((data) => {
        if (data && data.data && data.data.length > 0) {
          setPatient(data.data[0]);
          setShowPatientInfo(true);
          setNoPatientFound(false);
        } else {
          setPatient(null);
          setShowPatientInfo(false);
          setNoPatientFound(true);
        }
      })
      .catch((error) => {
        console.error("Error fetching patient:", error);
        setPatient(null);
        setShowPatientInfo(false);
        setNoPatientFound(true);
      });
  };
  

  return (
    <>
      <Header />
      <main className="searchPatient">
        <h1>Trouver un patient</h1>
        <h2>par nom ou date de naissance</h2>
        <form onSubmit={handleSearch}>
          <input
            type="text"
            value={searchPatient}
            onChange={(e) => setSearchPatient(e.target.value)}
            placeholder="Chercher patient"
          />
          <br />
          <button className="btn-2" type="submit">
            Search
          </button>
        </form>
        {showPatientInfo ? (
          <div key={patient?.id}>
            <p>{patient?.last_name}</p>
            <p>{patient?.first_name}</p>
            <p>{patient?.birth_date}</p>
            <button className="btn-5">
              <Link to={`/patient/${patient?.id}`}>Voir le patient</Link>
            </button>
          </div>
        ) : (
          noPatientFound && <p>Pas de patient trouvé</p> // Render "No patient found" message when no matching data is found
        )}
      </main>
      <Footer />
    </>
  );
};

export default FindAPatient;
