import React, { useEffect, useState } from "react";
import Header from "./Header";
import Footer from "./Footer";


const DisplayPharmacies = ()=>{

    const [pharmaciesData, setPharmaciesData] = useState([]);

  
    useEffect(() => {
      fetch("http://localhost:3001/api/pharmacies")
        .then((pharmaciesDataJson) => pharmaciesDataJson.json())
        .then((pharmaciesDataJs) => {
          setPharmaciesData(pharmaciesDataJs.data);
        });
    }, []);

    return (
      <>
      <Header />
      <main>
        <h1>Liste des Pharmacies</h1>

        {pharmaciesData.map((pharmacy) => {
          return (
            <div key={pharmacy.id}>
              <h2>{pharmacy.name}</h2>
              <p>Adresse : {pharmacy.address+", "+pharmacy.zipcode+" "+pharmacy.city}</p>
              <p>Téléphone : {pharmacy.phone_number}</p>
              <p>Email : {pharmacy.email}</p>
            </div>
          );
        })}
      </main>
      <Footer/>
    </>
      )
    }
    
export default DisplayPharmacies;