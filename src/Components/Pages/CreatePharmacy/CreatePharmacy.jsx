import Header from "../../Layout/Header/Header";
import Footer from "../../Layout/Footer/Footer";
import { useNavigate } from "react-router-dom";
import React, { useEffect} from "react";
import "./CreatePharmacy.css";


const CreatePharmacy = ()=>{

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

    const name = event.target.name.value;
    const verification_number = event.target.verification_number.value;
    const email = event.target.email.value;
    const address= event.target.address.value;
    const zipcode= event.target.zipcode.value;
    const city= event.target.city.value;
    const phone_number= event.target.phone_number.value;
    const username= event.target.username.value;
    const password= event.target.password.value;

    // Récupère le jeton JWT stocké dans le local storage   
    const token = localStorage.getItem("jwt");

    fetch("http://localhost:3001/api/pharmacies", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
      body: JSON.stringify({
        name: name,
        verification_number: verification_number,
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
        console.log("pharmacie créée");
      } else {alert('connectez-vous')
        console.log("erreur");
      }
    });
  };

  
  return (
    <div>
    <Header/>
    <main>
      <h1>Créer un dossier pharmacie</h1>
      <form onSubmit={handleSubmit} className="createPharmacy">
        <div>
          <label htmlFor="username">Nom utilisateur</label><br />
          <input type="text" name="username"/>
        </div>
        <div>
          <label htmlFor="password">Mot de passe</label><br />
          <input type="password" name="password"/>
        </div>
        <div>
          <label htmlFor="name">Prénom</label><br />
          <input type="text" name="name"/>
        </div>
        <div>
          <label htmlFor="verification_number">Numéro de licence</label><br />
          <input type="number" name="verification_number"/>
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

export default CreatePharmacy;