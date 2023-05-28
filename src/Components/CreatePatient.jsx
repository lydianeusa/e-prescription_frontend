import Header from "./Header";
import Footer from "./Footer";
import { useNavigate } from "react-router-dom";
import React, { useEffect} from "react";
import "../Styles/CreatePatient.css";


const CreatePatient = ()=>{

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

  const handleSubmit=(event)=>{
    event.preventDefault();

    const first_name = event.target.first_name.value;
    const last_name = event.target.last_name.value;
    const birth_date = event.target.birth_date.value;
    const email = event.target.email.value;

    // Récupère le jeton JWT stocké dans le local storage   
    const token = localStorage.getItem("jwt");

    fetch("http://localhost:3001/api/patients", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
      body: JSON.stringify({
        first_name: first_name,
        last_name: last_name,
        birth_date: birth_date,
        email: email,
      })
    })
    .then((response) => {
      if (response.status === 200) {alert('patient créé!')
        console.log("patient créé");
      } else {alert('connectez-vous')
        console.log("erreur");
      }
    });
  };

  
  return (
    <div>
    <Header/>
    <main className="createPatient">
      <h1>Créer un dossier patient</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="first_name">Prénom</label><br />
          <input type="text" name="first_name"/>
        </div>
        <div>
          <label htmlFor="last_name">Nom</label><br />
          <input type="text" name="last_name"/>
        </div>
        <div>
          <label htmlFor="birth_date">Date de naissance</label><br />
          <input type="date" name="birth_date"/>
        </div>
        <div>
          <label htmlFor="email">Email</label><br />
          <input type="text" name="email"/>
        </div>
        <button className="btn-2" type="submit">submit</button>
      </form>
    </main>
    <Footer/>
    </div>

  )
}

export default CreatePatient;