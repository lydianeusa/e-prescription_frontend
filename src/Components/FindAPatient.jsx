import React, { useState } from "react";
import Header from "./Header";

const FindAPatient = () => {
  const [search, setSearch] = useState("");
  const [patient, setPatient] = useState(null);

  const handleSubmit = (event) => {
    event.preventDefault();
    alert("Patient trouvé");

    useEffect(() => {
      fetch(`http://localhost:3001/api/patients?search=${search}`)
      .then((patientJson)=>patientJson.json())
      .then((patientJs)=>{
      setPatientData(patientJs.data)
  });
},[])

    fetch(`http://localhost:3000/patients?search=${search}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.length > 0) {
          const foundPatient = data[0];
          setPatient(foundPatient);
        } else {
          setPatient(null);
        }
      })
      .catch((error) => {
        console.error("Error fetching patient details", error);
      });

    setSearch("");
  };

  const handleSearchChange = (event) => {
    setSearch(event.target.value);
  };

  return (
    <>
      <Header />
      <main>
        <h1>Trouver un patient :</h1>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="search">Rechercher par nom : </label>
            <input type="text" value={search} onChange={handleSearchChange} />
            <button type="submit">Search</button>
          </div>
        </form>
        {patient && (
          <div>
            <p>Patient Name: {patient.last_name}</p>
            <p>First Name: {patient.first_name}</p>
            <p>Date of Birth: {patient.birth_date}</p>
            <p>Email: {patient.email}</p>
          </div>
        )}
      </main>
    </>
  );
};

export default FindAPatient;
