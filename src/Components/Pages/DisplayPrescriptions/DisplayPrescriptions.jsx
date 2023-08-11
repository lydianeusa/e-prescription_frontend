import React, { useEffect, useState } from "react";
import {Link} from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Footer from "../../Layout/Footer/Footer";
import Header from "../../Layout/Header/Header";
import "./DisplayPrescriptions.css";


const DisplayPrescriptions = ()=>{

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


    const [prescriptionsData, setPrescriptionsData] = useState([]);

    // Récupère le jeton JWT stocké dans le local storage   
    const token = localStorage.getItem("jwt");
  
    useEffect(() => {
      fetch("http://localhost:3001/api/prescriptions",{
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
  })
        .then((prescriptionsDataJson) => prescriptionsDataJson.json())
        .then((prescriptionsDataJs) => {
          setPrescriptionsData(prescriptionsDataJs.data);
        });
    }, []);

    return (
        <>
          <Header />
          <main>
            <h1>Liste des ordonnances</h1>
            {prescriptionsData.map((e) => {
              return (
                <div className="displayPrescription">
                  <div key={e.id}>
                    <h2>Ordonnance</h2>
                    <p>Médicament : {e.medicine_name}</p>
                    <p>Dosage : {e.dosage}</p>
                    <p>Fréquence: {e.frequency}</p>
                    <p>Durée: {e.duration}</p>
                    {/* <button className="btn-4"> */}
  {/* <Link to={{ pathname: `/prescription/${e.id}`, state: { prescription: e } }}>Voir l'ordonnance</Link>
</button> */}
                    <button className="btn-4"><Link to={`/prescription-admin/${e.id}`}>Voir l'ordonnance</Link></button>             
                  </div>
                </div>
              );
          })}
          </main>
          <Footer/>
      </>
      )
    }
    
export default DisplayPrescriptions;