import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";

const SearchPatient = () => {
  const [patient, setPatient] = useState(null);
  const [searchPatient, setSearchPatient] = useState("");
  const [showPatientInfo, setShowPatientInfo] = useState(false);
  const [noPatientFound, setNoPatientFound] = useState(false); // Add state for no patient found

  const handleSearch = (e) => {
    e.preventDefault();
  
    fetch(`http://localhost:3001/api/patients?search=${searchPatient}`, {
      headers: { "Content-Type": "application/json" }
    })
      .then((response) => response.json())
      .then((data) => {
        if (data && data.data && data.data.length > 0) {
          setPatient(data.data[0]);
          setShowPatientInfo(true);
          setNoPatientFound(false);
        } else {
          setPatient(null);
          setShowPatientInfo(false);
          setNoPatientFound(true);
        }
      })
      .catch((error) => {
        console.error("Error fetching patient:", error);
        setPatient(null);
        setShowPatientInfo(false);
        setNoPatientFound(true);
      });
  };
  

  return (
    <>
      <Header />
      <main className="searchPatient">
        <form onSubmit={handleSearch}>
          <input
            type="text"
            value={searchPatient}
            onChange={(e) => setSearchPatient(e.target.value)}
            placeholder="Chercher patient"
          />
          <br />
          <button className="btn-2" type="submit">
            Search
          </button>
        </form>
        {showPatientInfo ? (
          <div key={patient?.id}>
            <p>{patient?.last_name}</p>
            <p>{patient?.first_name}</p>
            <p>{patient?.birth_date}</p>
            <button className="btn-5">
              <Link to={`/patient/${patient?.id}`}>Voir le patient</Link>
            </button>
          </div>
        ) : (
          noPatientFound && <p>Pas de patient trouvé</p> // Render "No patient found" message when no matching data is found
        )}
      </main>
      <Footer />
    </>
  );
};

export default SearchPatient;
