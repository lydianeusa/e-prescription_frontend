import Footer from "../../Layout/Footer/Footer";
import Header from "../../Layout/Header/Header";
import { useNavigate} from "react-router-dom";
import React, { useEffect, useState} from "react";
import "./CreatePrescription.css"


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

  const [searchPharmacy, setSearchPharmacy] = useState("");
  const [pharmacy, setPharmacy] = useState(null);
  const [searchPharmacyResults, setSearchPharmacyResults] = useState([]);

  const [prescriptionCreated, setPrescriptionCreated] = useState(false);

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
        setPrescriptionCreated(true);
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

  const handleSearchPharmacy = (event) => {
    event.preventDefault();
    const searchQuery = searchPharmacy;
    const token = localStorage.getItem("jwt");
  
    fetch(`http://localhost:3001/api/pharmacies?search=${searchQuery}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setSearchPharmacyResults(data.data); // Update the search results state with the fetched data
      })
      .catch((error) => {
        console.error("Error fetching physicians:", error);
        setSearchPharmacyResults([]); // If there is an error, set the search results to an empty array
      });
  };
  
  
  return (
    <div>
    <Header/>
    <main className="createPrescription">
      <h1>Créer une ordonnance</h1>
      <form onSubmit={handleSubmit}>
        <div className="prescription">
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
        </div>

        <div className="physicianSearch">
          <div>
            <label htmlFor="physicianName">Tapez le nom du médecin:*</label><br />
            <input
              type="text"
              required="required" 
              name="searchPhysician"
              defaultValue={searchPhysician}
              onChange={(e) => setSearchPhysician(e.target.value)}
              placeholder="Nom du médecin"
            />
            <br />
            <button type="button" className="btn-2" onClick={handleSearchPhysician}>
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
                  type="button" className="btn-4"
                  onClick={() => {
                    setPhysician(physician); // Set the selected physician
                    // Set the selected physician's ID in the input field
                    const physicianIdInput = document.getElementsByName("PhysicianId")[0];
                    physicianIdInput.value = physician?.id || "";
                              // Set the selected physician's full name in the input field
                    const physicianNameInput = document.getElementsByName("physicianName")[0];
                    physicianNameInput.value = physician?.last_name && physician?.first_name
                    ? `${physician?.last_name} ${physician?.first_name}`
                    : "";
                  }}
                >
                  Sélectionner
                </button>
              </div>
            ))}
          </div>
          <div>
            <input type="hidden" name="PhysicianId" value={physician?.id || ""} />
          </div>
          <div>
            <label htmlFor="physicianName">Pour le médecin:*</label><br />
            <input type="text" name="physicianName" required="required" 
              defaultValue={physician?.last_name && physician?.first_name
              ? `${physician?.last_name} ${physician?.first_name}`
              : ""} />
          </div>
        </div>

        <div className="patientSearch">
          <div>
          <label htmlFor="patientName">Tapez le nom du patient:*</label><br />
            <input
              type="text"
              required="required" 
              name="searchPatient"
              defaultValue={searchPatient}
              onChange={(e) => setSearchPatient(e.target.value)}
              placeholder="Nom du patient"
            />
            <br />
              <button type="button" className="btn-2" onClick={handleSearchPatient}>
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
                  type="button" className="btn-4"
                  onClick={() => {
                    setPatient(patient); // Set the selected patient
                    // Set the selected patient's ID in the input field
                    const patientIdInput = document.getElementsByName("PatientId")[0];
                    patientIdInput.value = patient?.id || "";
                              // Set the selected patient's full name in the input field
                    const patientNameInput = document.getElementsByName("patientName")[0];
                    patientNameInput.value = patient?.last_name && patient?.first_name
                    ? `${patient?.last_name} ${patient?.first_name}`
                    : "";
                  }}
                >
                  Sélectionner
                </button>
              </div>
            ))}
          </div>
          <div>
            <input type="hidden" name="PatientId" value={patient?.id|| ""} />
          </div>
          <div>
            <label htmlFor="patientName">Pour le patient:*</label><br />
            <input type="text" name="patientName" required="required" 
              defaultValue={patient?.last_name && patient?.first_name
              ? `${patient?.last_name} ${patient?.first_name}`
              : ""} 
            />
          </div>
        </div>
          
        <div className="pharmacySearch">  
          <div>
          <label htmlFor="pharmacyName">Tapez le nom de la pharmacie:*</label><br />
            <input
              type="text"
              required="required" 
              name="searchPharmacy"
              defaultValue={searchPharmacy}
              onChange={(e) => setSearchPharmacy(e.target.value)}
              placeholder="Nom de la pharmacie"
            />
            <br />
              <button type="button" className="btn-2" onClick={handleSearchPharmacy}>
              Rechercher
            </button>
          </div>
          <div>
            {searchPharmacyResults.map((pharmacy) => (
              <div key={pharmacy?.id}>
                <p>
                  {pharmacy?.name} {pharmacy?.city}
                </p>
                <button
                  type="button" className="btn-4"
                  onClick={() => {
                    setPharmacy(pharmacy); // Set the selected pharmacy
                    // Set the selected pharmacy's ID in the input field
                    const pharmacyIdInput = document.getElementsByName("PharmacyId")[0];
                    pharmacyIdInput.value = pharmacy?.id || "";
                  }}
                >
                  Sélectionner
                </button>
              </div>
            ))}
          </div>
          <div>
            <input type="hidden" name="PharmacyId" value={pharmacy?.id|| ""} />
          </div>
          <div>
            <label htmlFor="pharmacyName">Pour la pharmacie:*</label><br />
            <input type="text" required="required" name="pharmacyName" defaultValue={pharmacy?.name|| ""} />
          </div>
        </div>

        <button className="btn-3" type="number">Envoyer</button>
      </form>
      {prescriptionCreated && <p>L'ordonnance a été créée</p>}
    </main>
    <Footer/>
    </div>
  )
}

export default CreatePrescription;