import { useEffect, useState} from "react";
import { useParams } from "react-router-dom";
import { useNavigate} from "react-router-dom";
import Header from "../../Layout/Header/Header";
import Footer from "../../Layout/Footer/Footer";
import "./UpdatePrescription.css"

const UpdatePrescription = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("jwt");
  // Autorisation JWT
  useEffect(() => {
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


  const [prescription, setPrescription]= useState (null);
  const [prescriptionModified, setPrescriptionModified] = useState(false);

  const { id } = useParams();

    useEffect(() => {
      fetch(`http://localhost:3001/api/prescriptions/${id}`, {
      headers: { "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
      },
    })
        .then((responseJson) => responseJson.json())
        .then((responseJs) => {
          setPrescription(responseJs.data);
        });
    }, [id]);

    const handleSubmit = (event) => {
      event.preventDefault();
  
      const medicine_name = event.target.medicine_name.value;
      const dosage = event.target.dosage.value;
      const frequency = event.target.frequency.value;
      const duration = event.target.duration.value;

      const token = localStorage.getItem("jwt");

      fetch(`http://localhost:3001/api/prescriptions/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
            medicine_name: medicine_name,
            dosage: dosage,
            frequency: frequency,
            duration: duration
          })
  
      }).then((response) => {
        if (response.status === 200) {
          console.log("ordonnance modifiée");
          setPrescriptionModified(true);
        } else {
          console.log("erreur");
        }
      });
    };

    const handleDeleteClick = (prescription) => {
      fetch("http://localhost:3001/api/prescriptions/" + prescription.id, {
          method: "DELETE",
          headers: {"Authorization": `Bearer ${token}`},
      })
      .then(() => {
          navigate(0);
      })
      .catch((error) => {
          console.log(error);
      });
  };

    return (
        <>
          <Header/>
          <main className="modifyPrescription">
            {prescription ? (
              <>
                <h1>Mise à jour l'ordonnance :</h1>
                <form onSubmit={handleSubmit}>
                  <div className="updatePrescription">
                    <div>
                    <label htmlFor="medicine_name">Nom du médicament</label><br />
                      <input type="text" name="medicine_name" defaultValue={prescription.medicine_name} />
                    </div>
                    <div>
                    <label htmlFor="dosage">Dosage</label><br />
                      <input type="text" name="dosage" defaultValue={prescription.dosage} />
                    </div>
                    <div>
                    <label htmlFor="frequency">Fréquence</label><br />
                      <input type="text" name="frequency" defaultValue={prescription.frequency} />
                    </div>
                    <div>
                    <label htmlFor="duration">Durée</label><br />
                      <input type="text" name="duration" defaultValue={prescription.duration} />
                    </div>
                 
      
                  <button type="submit" className="btn-4">Mettre à jour l'ordonnance</button>
                  </div>
                </form>
                <button onClick ={() => handleDeleteClick(prescription)} className="btn-3">Supprimer l'ordonnance</button>
              </>
            ) : (
              <p>L'ordonnance a été supprimée de la base de données.</p>
            )}
          {prescriptionModified && <p>L'ordonnance a été modifiée</p>}
          </main>
 
          <Footer/>
      </>
    )
  };
  
  export default UpdatePrescription;