import Header from "../../Layout/Header/Header";
import Footer from "../../Layout/Footer/Footer";
import { useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import "./CreatePatient.css";


const CreatePatient = ()=>{

  const navigate = useNavigate();
  useEffect(() => {
      const token = localStorage.getItem("jwt");
      if (!token) {
          navigate("/login");
          return;
      }
      const jwtData = token.split(".")[1];
      const decodedJwt = JSON.parse(window.atob(jwtData));
      const expirationTime = decodedJwt.exp * 1000;
      const timeoutId = setTimeout(() => {
          navigate("/login");
      }, expirationTime - Date.now()); 
      return () => clearTimeout(timeoutId);
  }, [navigate]);

  const [patientCreated, setPatientCreated] = useState(false);

  const handleSubmit=(event)=>{
    event.preventDefault();

    const first_name = event.target.first_name.value;
    const last_name = event.target.last_name.value;
    const birth_date = event.target.birth_date.value;
    const email = event.target.email.value;
    const address= event.target.address.value;
    const zipcode= event.target.zipcode.value;
    const city= event.target.city.value;
    const phone_number= event.target.phone_number.value;
    const username= event.target.username.value;
    const password= event.target.password.value;
  
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
        address: address,
        zipcode: zipcode,
        city: city,
        phone_number: phone_number,
        username: username,
        password: password,
      })
  }).then((response) => {
    if (response.status === 200) {
      console.log("patient créé");
      setPatientCreated(true);
    } else {
      console.log("erreur");
      setPatientCreated(false);
    }
  });
};


  
  return (
    <div>
    <Header/>
    <main>
      <h1>Créer un dossier patient</h1>
      <form onSubmit={handleSubmit} className="createPatient">
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
          <label htmlFor="birth_date">Date de naissance</label><br />
          <input type="date" name="birth_date"/>
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
      
      {patientCreated && <p>Le patient a été créé.</p>}
    </main>
    <Footer/>
    </div>

  )
}

export default CreatePatient;