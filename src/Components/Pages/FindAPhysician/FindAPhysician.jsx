import React, { useState } from "react";
import Header from "../../Layout/Header/Header";
import Footer from "../../Layout/Footer/Footer";
import "./FindAPhysician.css"

const FindAPhysician = () => {
    const [physicians, setPhysicians] = useState([]);
    const [searchPhysician, setSearchPhysician] = useState("");
    const [showPhysicianInfo, setShowPhysicianInfo] = useState(false);
    const [noPhysicianFound, setNoPhysicianFound] = useState(false);
  
    const handleSearch = (e) => {
      e.preventDefault();
  
      fetch(`http://localhost:3001/api/physicians?search=${searchPhysician}`, {
        headers: { "Content-Type": "application/json" }
      })
        .then((response) => response.json())
        .then((data) => {
          if (data && data.data && data.data.length > 0) {
            setPhysicians(data.data);
            setShowPhysicianInfo(true);
            setNoPhysicianFound(false);
          } else {
            setPhysicians([]);
            setShowPhysicianInfo(false);
            setNoPhysicianFound(true);
          }
        })
        .catch((error) => {
          console.error("Error fetching physicians:", error);
          setPhysicians([]);
          setShowPhysicianInfo(false);
          setNoPhysicianFound(true);
        });
    };

    return (
        <>
        <Header />
        <main className="searchPhysician">
          <h1>Trouver un médecin</h1>
          <h2>par nom ou spécialité ou ville</h2>
          <form onSubmit={handleSearch}>
            <input
              type="text"
              value={searchPhysician}
              onChange={(e) => setSearchPhysician(e.target.value)}
              placeholder="Chercher Physician"
            />
            <br />
            <button className="btn-2" type="submit">
              Search
            </button>
          </form>
          {showPhysicianInfo ? (
            physicians.length > 0 ? (
                physicians.map((physician) => (
                <div key={physician?.id}>
                  <h2>Médecin {physician?.first_name} {physician?.last_name}</h2>
                  <p>{physician?.specialty}</p>
                  <p>{physician?.address}</p>
                  <p>{physician?.zipcode}</p>
                  <p>{physician?.city}</p>
                </div>
              ))
            ) : (
              <p>Pas de médecin trouvé</p>
            )
          ) : (
            noPhysicianFound && <p>Pas de médecin trouvé</p>
          )}
        </main>
        <Footer />
      </>
    )
}

export default FindAPhysician;