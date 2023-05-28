import React, { useEffect, useState } from "react";
import Header from "./Header";
import Footer from "./Footer";
import { useNavigate } from "react-router-dom";
import "../Styles/DisplayPhysicians.css";


const DisplayPhysicians = ()=>{

    const [physiciansData, setPhysiciansData] = useState([]);


  
    useEffect(() => {
      fetch("http://localhost:3001/api/physicians")
        .then((physiciansDataJson) => physiciansDataJson.json())
        .then((physiciansDataJs) => {
          setPhysiciansData(physiciansDataJs.data);
        });
    }, []);

    return (
        <>
        <Header />
        <main className="displayPhysicians">
          <h1>Liste des Médecins</h1>
    
          {physiciansData.map((physician) => {
            return (
              <div key={physician.id}>
                <h2>{physician.last_name+" "+physician.first_name}</h2>
                <p>Spécialité : {physician.specialty}</p>
                <p>Adresse : {physician.address+", "+physician.zipcode+" "+physician.city}</p>
                <p>Téléphone : {physician.phone_number}</p>
                <p>Email : {physician.email}</p>
    
                {/* <Link to={`/physicians/${physician.id}`}>Voir le médecin</Link> */}
              </div>
            );
          })}
        </main>
        <Footer/>
      </>
      )
    }
    
export default DisplayPhysicians;