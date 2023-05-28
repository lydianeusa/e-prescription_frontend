import Footer from "./Footer";
import Header from "./Header";
import { useNavigate } from "react-router-dom";
import React, { useEffect} from "react";


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

  const handleSubmit=(event)=>{alert('ordonnance créée');
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
          <label htmlFor="PhysicianId">Pour le médecin:</label><br />
          <input type="number" name="PhysicianId"/>
        </div>
        <div>
          <label htmlFor="PatientId">Pour le patient:</label><br />
          <input type="number" name="PatientId"/>
        </div>
        <div>
          <label htmlFor="PharmacyId">Pour la pharmacie:</label><br />
          <input type="number" name="PharmacyId"/>
        </div>
        <button className="btn-2" type="number">submit</button>
      </form>
    </main>
    <Footer/>
    </div>
  )
}

export default CreatePrescription;