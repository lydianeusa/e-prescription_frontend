import { useEffect, useState} from "react";
import { useParams, useNavigate } from "react-router-dom";
import Header from "../../Layout/Header/Header";
import Footer from "../../Layout/Footer/Footer";


const UpdatePatient = () => {

        const navigate = useNavigate();
        const token = localStorage.getItem("jwt");
        const roles = localStorage.getItem("roles");

        console.log("Token:", token);
        console.log("Role:", roles)

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

  const [patient, setPatient]=useState(null)
  const [patientModified, setPatientModified] = useState(false); // State to track if the patient has been modified

    const { id } = useParams();
  
    useEffect(() => {
      fetch(`http://localhost:3001/api/patients/${id}`, {
        headers: { "Content-Type": "application/json" ,
        Authorization: `Bearer ${token}`
        },  
    })
        .then((responseJson) => responseJson.json())
        .then((responseJs) => {
          setPatient(responseJs.data);
        });
    }, [id, token]);

    console.log("ID:", id); // Check the value of "id" here
  
    const handleSubmit = (event) => {
      event.preventDefault();
  
      const first_name = event.target.first_name.value;
      const last_name = event.target.last_name.value;
      const birth_date = event.target.birth_date.value;
      const email = event.target.email.value;

      // const token = localStorage.getItem("jwt");

  
      fetch(`http://localhost:3001/api/patients/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
            first_name: first_name,
            last_name: last_name,
            birth_date: birth_date,
            email: email,
          }),
        }).then((response) => {
        if (response.status === 200) {
          console.log("information du patient modifiée");
          setPatientModified(true);
        } else {
          console.log("erreur");
          setPatientModified(false);
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
                  <label htmlFor="first_name">Prénom</label><br />
                    <input type="text" name="first_name" defaultValue={patient.first_name} />
                  </div>
                  <div>
                  <label htmlFor="last_name">Nom</label><br />
                    <input type="text" name="last_name" defaultValue={patient.last_name} />
                  </div>
                  <div>
                  <label htmlFor="birth_date">Date de naissance</label><br />
                    <input type="date" name="birth_date" defaultValue={patient.birth_date} />
                  </div>
                  <div>
                  <label htmlFor="email">Email</label><br />
                    <input type="text" name="email" defaultValue={patient.email} />
                  </div>
      
                  <button type="submit" className="btn-6">Mettre à jour les informations du patient</button>
                </form>
              </>
            ) : (
              <p>Le patient a été supprimé de la base de données.</p>
            )}
            {patientModified && <p>Le patient a été modifié.</p>}
          </main>
          <Footer/>
      </>
    )
  };
  
  export default UpdatePatient;