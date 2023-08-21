import React, {useState, useEffect } from "react";
import { Link, useNavigate} from "react-router-dom";
import Header from "../../Layout/Header/Header";
import Footer from "../../Layout/Footer/Footer";
import "./FindAPatient.css";


const FindAPatient = () => {


  const navigate = useNavigate();
  useEffect(() => {
      const token = localStorage.getItem("jwt");
      if (!token) {
          navigate("/login");
          return;
      }
      const jwtData = token.split(".")[1];
      const decodedJwt = JSON.parse(atob(jwtData));
      const expirationTime = decodedJwt.exp * 1000;
      const timeoutId = setTimeout(() => {
          navigate("/login");
      }, expirationTime - Date.now());
      return () => clearTimeout(timeoutId);
  }, [navigate]);

  
  const [patients, setPatients] = useState([]);
  const [searchPatient, setSearchPatient] = useState("");
  const [showPatientInfo, setShowPatientInfo] = useState(false);
  const [noPatientFound, setNoPatientFound] = useState(false); // Add state for no patient found

  const handleSearch = (e) => {
    e.preventDefault();
    console.log("Searching for patient with name:", searchPatient); 
    const token = localStorage.getItem("jwt");
    fetch(`http://localhost:3001/api/patients?search=${searchPatient}`, {
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
              // ${localStorage.getItem("roles")}`
        },
    })
    .then((response) => response.json())
    .then((data) => {
      console.log("Received data from API:", data); // Add this log
      if (data && data.data && data.data.length > 0) {
        setPatients(data.data);
        setShowPatientInfo(true);
        setNoPatientFound(false);
      } else {
        setPatients([]);
        setShowPatientInfo(false);
        setNoPatientFound(true);
      }
    })
    .catch((error) => {
      console.error("Error fetching patients:", error);
      setPatients([]);
      setShowPatientInfo(false);
      setNoPatientFound(true);
    });
};

  return (
    <>
      <Header />
      <main className="searchPatient">
        <h1>Trouver un patient</h1>
        <form onSubmit={handleSearch}>
          <input
            type="text"
            value={searchPatient}
            onChange={(e) => setSearchPatient(e.target.value)}
            placeholder="Nom du patient"
          />
          <br />
          <button className="btn-2" type="submit">
            Chercher
          </button>
        </form>

        {showPatientInfo ? (
          <>
            {patients.map((patient) => (
              <div key={patient.id} className="findAPatient">
                <p>{patient.last_name} {patient.first_name}</p>
                <button className="btn-4"><Link to={`/patient/${patient.id}`}>Voir le patient</Link></button>
              </div>
            ))}
          </>
          ) : (
          noPatientFound && <p className="noPatientFound">Pas de patient trouvé</p>
        )}
      </main>
      <Footer />
    </>
  );
};

export default FindAPatient;
