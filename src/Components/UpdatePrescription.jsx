import { useEffect, useState} from "react";
import { useParams } from "react-router-dom";
import { useNavigate} from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";

const UpdatePrescription = () => {

    const [prescription, setPrescription]= useState (null)

    const { id } = useParams();

    const navigate = useNavigate();
  
    useEffect(() => {
      fetch(`http://localhost:3001/api/prescriptions/${id}`)
        .then((responseJson) => responseJson.json())
        .then((responseJs) => {
          setPrescription(responseJs.data);
        });
    }, [id]);



    const handleDeleteClick = () => { alert('ordonnance supprimée');
    fetch(`http://localhost:3001/api/prescriptions/${id}`, {
        method: "DELETE" 
      })
      
        .then(() => {
          navigate(0);
        })
        .catch((error) => {
          console.log(error);
        });
    };
  
    const handleSubmit = (event) => { alert('ordonnance modifiée');
      event.preventDefault();
  
      const medicine_name = event.target.medicine_name.value;
      const dosage = event.target.dosage.value;
      const frequency = event.target.frequency.value;
      const duration = event.target.duration.value;
  
      fetch(`http://localhost:3001/api/prescriptions/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
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
        } else {
          console.log("erreur");
        }
      });
    };

    

    return (
        <>
          <Header/>
          <main>
            {prescription ? (
              <>
                <h1>Mise à jour l'ordonnance :</h1>
                <form onSubmit={handleSubmit}>
                  <div>
                  <label htmlFor="medicine_name">Nom du médicament</label>
                    <input type="text" name="medicine_name" defaultValue={prescription.medicine_name} />
                  </div>
                  <div>
                  <label htmlFor="dosage">Dosage</label>
                    <input type="text" name="dosage" defaultValue={prescription.dosage} />
                  </div>
                  <div>
                  <label htmlFor="frequency">Fréquence</label>
                    <input type="text" name="frequency" defaultValue={prescription.frequency} />
                  </div>
                  <div>
                  <label htmlFor="duration">Durée</label>
                    <input type="text" name="duration" defaultValue={prescription.duration} />
                  </div>
      
                  <button type="submit">Mettre à jour l'ordonnance</button>
                </form>
                <button onClick={() => handleDeleteClick(prescription)}>Supprimer l'ordonnance</button>
              </>
            ) : (
              <p>L'ordonnance a été supprimée de la base de données.</p>
            )}
          </main>
          <Footer/>
      </>
    )
  };
  
  export default UpdatePrescription;