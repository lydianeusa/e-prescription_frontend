import Footer from "../../Layout/Footer/Footer";
import Header from "../../Layout/Header/Header";
import { useNavigate} from "react-router-dom";
import React, { useEffect, useState} from "react";


const CreatePrescription = ()=>{


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

  const [searchPatient, setSearchPatient] = useState("");
  const [patient, setPatient] = useState(null);
  const [searchPatientResults, setSearchPatientResults] = useState([]);
  const [searchPhysician, setSearchPhysician] = useState("");
  const [physician, setPhysician] = useState(null);
  const [searchPhysicianResults, setSearchPhysicianResults] = useState([]);


  const handleSubmit=(event)=>{
    event.preventDefault();

    const medicine_name = event.target.medicine_name.value;
    const dosage = event.target.dosage.value;
    const frequency = event.target.frequency.value;
    const duration = event.target.duration.value;
    const PatientId = event.target.PatientId.value;
    const PhysicianId = event.target.PhysicianId.value;
    const PharmacyId = event.target.PharmacyId.value;

    // Récupère le jeton JWT stocké dans le local storage   
    const token = localStorage.getItem("jwt");

    fetch("http://localhost:3001/api/prescriptions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
      body: JSON.stringify({
        medicine_name: medicine_name,
        dosage: dosage,
        frequency: frequency,
        duration: duration,
        PhysicianId: PhysicianId,
        PatientId : PatientId,
        PharmacyId: PharmacyId
      })
    })
    .then((response) => {
      if (response.status === 200) {
        console.log("ordonnance créée");
      } else {
        console.log("erreur");
      }
    })
    .catch((error) => {
      console.error("Error creating prescription:", error);
    });
  };

    const handleSearchPatient = (event) => {
      event.preventDefault();
      const searchQuery = searchPatient;
      const token = localStorage.getItem("jwt");
    fetch(`http://localhost:3001/api/patients?search=${searchQuery}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setSearchPatientResults(data.data); // Update the search results state with the fetched data
      })
      .catch((error) => {
        console.error("Error fetching patients:", error);
        setSearchPatientResults([]); // If there is an error, set the search results to an empty array
      });
  };

  const handleSearchPhysician = (event) => {
    event.preventDefault();
    const searchQuery = searchPhysician;
    const token = localStorage.getItem("jwt");
  
    fetch(`http://localhost:3001/api/physicians?search=${searchQuery}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setSearchPhysicianResults(data.data); // Update the search results state with the fetched data
      })
      .catch((error) => {
        console.error("Error fetching physicians:", error);
        setSearchPhysicianResults([]); // If there is an error, set the search results to an empty array
      });
  };
  
  
  return (
    <div>
    <Header/>
    <main>
      <h1>Créer une ordonnance</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="medicine_name">Médicament</label><br />
          <input type="text" name="medicine_name"/>
        </div>
        <div>
          <label htmlFor="dosage">Dosage</label><br />
          <input type="text" name="dosage"/>
        </div>
        <div>
          <label htmlFor="frequency">Fréquence</label><br />
          <input type="text" name="frequency"/>
        </div>
        <div>
          <label htmlFor="duration">Durée</label><br />
          <input type="text" name="duration"/>
        </div>
        <div>
          <input
            type="text"
            name="searchPhysician"
            value={searchPhysician}
            onChange={(e) => setSearchPhysician(e.target.value)}
            placeholder="Nom du médecin"
          />
          <button type="button" onClick={handleSearchPhysician}>
            Rechercher
          </button>
        </div>
        <div>
          {searchPhysicianResults.map((physician) => (
            <div key={physician?.id}>
              <p>
                {physician?.last_name} {physician?.first_name}
              </p>
              <button
                type="button"
                onClick={() => {
                  setPhysician(physician); // Set the selected physician
                  // Set the selected physician's ID in the input field
                  const physicianIdInput = document.getElementsByName("PhysicianId")[0];
                  physicianIdInput.value = physician?.id || "";
                }}
              >
                Sélectionner
              </button>
            </div>
          ))}
        </div>

        <div>
          <label htmlFor="PhysicianId">Pour le médecin:</label><br />
          <input type="number" name="PhysicianId" value={physician?.id || ""} />
        </div>


        <div>
          <input
            type="text"
            name="searchPatient"
            value={searchPatient}
            onChange={(e) => setSearchPatient(e.target.value)}
            placeholder="Nom du patient"
          />
            <button type="button" onClick={handleSearchPatient}>
            Rechercher
          </button>
        </div>
        <div>
          {searchPatientResults.map((patient) => (
            <div key={patient?.id}>
              <p>
                {patient?.last_name} {patient?.first_name}
              </p>
              <button
                type="button"
                onClick={() => {
                  setPatient(patient); // Set the selected patient
                  // Set the selected patient's ID in the input field
                  const patientIdInput = document.getElementsByName("PatientId")[0];
                  patientIdInput.value = patient?.id || "";
                }}
              >
                Sélectionner
              </button>
            </div>
          ))}
        </div>
        <div>
          <label htmlFor="PatientId">Pour le patient:</label><br />
          <input type="number" name="PatientId" value={patient?.id|| ""} />
        </div>

        <div>
          <label htmlFor="PharmacyId">Pour la pharmacie:</label><br />
          <input type="number" name="PharmacyId"/>
        </div>
        <button className="btn-2" type="number">Envoyer</button>
      </form>
    </main>
    <Footer/>
    </div>
  )
}

export default CreatePrescription;