import React, { useEffect, useState } from "react";
import Header from "../../Layout/Header/Header";
import Footer from "../../Layout/Footer/Footer";
import { useNavigate } from "react-router-dom";
import {Link} from "react-router-dom";
import "./DisplayPhysicians.css";


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
        <main>
          <h1>Liste des Médecins</h1>
    
          {physiciansData.map((physician) => {
            return (
              <div className="displayPhysicians" key={physician.id}>
                <div key={physician.id}>
                  <h2>{physician.last_name+" "+physician.first_name}</h2>
                  <p>Spécialité : {physician.specialty}</p>
                  <p>Adresse : {physician.address+", "+physician.zipcode+" "+physician.city}</p>
                  <p>Téléphone : {physician.phone_number}</p>
                  <p>Email : {physician.email}</p>
      
                  <Link to={`/physician/${physician.id}`}><button className="btn-4">Voir le médecin</button></Link>
                </div>
              </div>
            );
          })}
        </main>
        <Footer/>
      </>
      )
    }
    
export default DisplayPhysicians;