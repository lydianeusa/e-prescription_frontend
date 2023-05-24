import { useEffect, useState} from "react";
import { useParams } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";

const UpdatePatient = () => {

  const [patient, setPatient]=useState(null)

    const { id } = useParams();
  
    useEffect(() => {
      fetch(`http://localhost:3001/api/patients/${id}`)
        .then((responseJson) => responseJson.json())
        .then((responseJs) => {
          setPatient(responseJs.data);
        });
    }, [id]);

  
    const handleSubmit = (event) => { alert('patient modifié');
      event.preventDefault();
  
      const first_name = event.target.first_name.value;
      const last_name = event.target.last_name.value;
      const birth_date = event.target.birth_date.value;
      const email = event.target.email.value;
  
      fetch(`http://localhost:3001/api/patients/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
            first_name: first_name,
            last_name: last_name,
            birth_date: birth_date,
            email: email,
          })
  
      }).then((response) => {
        if (response.status === 200) {
          console.log("information du patient modifiée");
        } else {
          console.log("erreur");
        }
      });
    };

    

    return (
        <>
          <Header/>
          <main>
            {patient ? (
              <>
                <h1>Mise à jour du patient : {patient.last_name+" "+patient.first_name}</h1>
                <form onSubmit={handleSubmit}>
                  <div>
                  <label htmlFor="first_name">Prénom</label>
                    <input type="text" name="first_name" defaultValue={patient.first_name} />
                  </div>
                  <div>
                  <label htmlFor="last_name">Nom</label>
                    <input type="text" name="last_name" defaultValue={patient.last_name} />
                  </div>
                  <div>
                  <label htmlFor="birth_date">Date de naissance</label>
                    <input type="date" name="birth_date" defaultValue={patient.birth_date} />
                  </div>
                  <div>
                  <label htmlFor="email">Email</label>
                    <input type="text" name="email" defaultValue={patient.email} />
                  </div>
      
                  <button type="submit">Mettre à jour les informations du patient</button>
                </form>
              </>
            ) : (
              <p>Le patient a été supprimé de la base de données.</p>
            )}
          </main>
          <Footer/>
      </>
    )
  };
  
  export default UpdatePatient;