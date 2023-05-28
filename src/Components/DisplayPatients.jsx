import React, { useEffect, useState } from "react";
import Header from "./Header";
import Footer from "./Footer";
import {Link} from "react-router-dom";
import { useNavigate } from "react-router-dom";



const DisplayPatients = ()=>{

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

    const [patientsData, setPatientsData] = useState([]);
  
    // Récupère le jeton JWT stocké dans le local storage   
    const token = localStorage.getItem("jwt");

    useEffect(() => {
      fetch("http://localhost:3001/api/patients",{
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
          },
      })
        .then((patientsDataJson) => patientsDataJson.json())
        .then((patientsDataJs) => {
          setPatientsData(patientsDataJs.data);
        });
    }, []);

    return (
        <>
            <Header/>
            <main>
                <h1>Liste des Patients</h1>

                {patientsData.map((patient) => {
                    return (
                    <div key={patient.id}>
                        <h2>{patient.first_name +" "+patient.last_name}</h2>
                        <Link to={`/patient/${patient.id}`}>Voir le patient</Link>
                    </div>    
                    );
                })}
            </main>
            <Footer/>
        </>
    )

}
    
export default DisplayPatients;