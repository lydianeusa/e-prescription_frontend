import Header from "../../Layout/Header/Header";
import Footer from "../../Layout/Footer/Footer";
import { useNavigate } from "react-router-dom";
import React, { useEffect} from "react";


const CreatePhysician = ()=>{

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
    const verification_number = event.target.verification_number.value;
    const specialty = event.target.specialty.value;
    const email = event.target.email.value;
    const address= event.target.address.value;
    const zipcode= event.target.zipcode.value;
    const city= event.target.city.value;
    const phone_number= event.target.phone_number.value;
    const username= event.target.username.value;
    const password= event.target.password.value;

    // Récupère le jeton JWT stocké dans le local storage   
    const token = localStorage.getItem("jwt");

    fetch("http://localhost:3001/api/physicians", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
      body: JSON.stringify({
        first_name: first_name,
        last_name: last_name,
        verification_number: verification_number,
        specialty: specialty,
        email: email,
        address: address,
        zipcode: zipcode,
        city: city,
        phone_number: phone_number,
        username: username,
        password: password,
      })
    })
    .then((response) => {
      if (response.status === 200) {
        console.log("médecin créé");
      } else {alert('connectez-vous')
        console.log("erreur");
      }
    });
  };

  
  return (
    <div>
    <Header/>
    <main className="createPhysician">
      <h1>Créer un dossier médecin</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="username">Nom utilisateur</label><br />
          <input type="text" name="username"/>
        </div>
        <div>
          <label htmlFor="password">Mot de passe</label><br />
          <input type="password" name="password"/>
        </div>
        <div>
          <label htmlFor="first_name">Prénom</label><br />
          <input type="text" name="first_name"/>
        </div>
        <div>
          <label htmlFor="last_name">Nom</label><br />
          <input type="text" name="last_name"/>
        </div>
        <div>
          <label htmlFor="verification_number">Numéro de licence</label><br />
          <input type="number" name="verification_number"/>
        </div>
        <div>
          <label htmlFor="specialty">Specialité</label><br />
          <input type="text" name="specialty"/>
        </div>
        <div>
          <label htmlFor="email">Email</label><br />
          <input type="email" name="email"/>
        </div>
        <div>
          <label htmlFor="address">Numéro et rue</label><br />
          <input type="text" name="address"/>
        </div>
        <div>
          <label htmlFor="zipcode">Code postal</label><br />
          <input type="number" name="zipcode"/>
        </div>
        <div>
          <label htmlFor="city">Ville</label><br />
          <input type="text" name="city"/>
        </div>
        <div>
          <label htmlFor="phone_number">Téléphone</label><br />
          <input type="number" name="phone_number"/>
        </div>
        <button className="btn-2" type="submit">Envoyer</button>
      </form>
    </main>
    <Footer/>
    </div>

  )
}

export default CreatePhysician;