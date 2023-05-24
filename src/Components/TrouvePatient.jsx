import React, { useState } from "react";
import Header from "./Header";
import {Link} from "react-router-dom";

const TrouvePatient = () => {
  const [search, setSearch] = useState("");
  const [patient, setPatient] = useState(null);
  const [error, setError] = useState(null);

  const handleSubmit = (event) => {
    event.preventDefault();
    alert("Patient trouvé");
    const searchPatient = event.target.elements.search.value;
    

    fetch(`http://localhost:3001/api/patients?search=${searchPatient}`)
      .then((res) => {
        if (res.status === 200) {
          return res.json();
        } else if (res.status === 304) {
          // If the response is 304, no need to parse the response
          // Use the existing patient data in state
          return patient;
        } else {
          throw new Error("Error: " + res.status);
        }
      })
      .then((data) => {
        if (data.length > 0) {
          const foundPatient = data[0];
          setPatient(foundPatient);
          setError(null);
        } else {
          setPatient(null);
          setError("No patient found.");
        }
      })
      .catch((error) => {
        console.error("Error fetching patient details:", error);
        setError("An error occurred while fetching patient details.");
      });

    setSearch("");
  };

  const handleSearchChange = (event) => {
    setSearch(event.target.value);
  };

  return (
    <>
      <Header />

      <>
        <h1>Trouver un patient :</h1>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="search">Rechercher par nom : </label>
            <input type="text" name="search" value={search} onChange={handleSearchChange} />
            <button type="submit">Search</button>
          </div>
        </form>
        {error && <p>Error: {error}</p>}
        {patient && (
          <div>
            <p>Patient Name: {patient.last_name}</p>
            <p>First Name: {patient.first_name}</p>
            <p>Date of Birth: {patient.birth_date}</p>
            <p>Email: {patient.email}</p>
          </div>
        )}
        <Link to={`/patient/${patient.id}`}>Voir le patient</Link>
        <Link to={`/patient/${patient.id}/update`}>modifier le patient</Link>
      </>
    </>
  );
};

export default TrouvePatient;
