import Header from "./Header";
import { useEffect, useState } from "react";
import {Link} from "react-router-dom";

const SearchPatient = () => {
  const [patient, setPatient] = useState(null);
  const [searchPatient, setSearchPatient] = useState("");

  useEffect(() => {
    fetch(`http://localhost:3001/api/patients?search=${searchPatient}`,{headers:{"Content-Type":"application/json"}})
      .then((response) => response.json())
      .then((data) => {
        if (data.data.length > 0) {
          setPatient(data.data[0]);
        } else {
          setPatient(null);
        }
      });
  }, [searchPatient]);

  

  return (
    <>
      <Header />
      <input type="text" value={searchPatient} onChange={(e) => setSearchPatient(e.target.value)}
        placeholder="Chercher patient"
      />
      <button type="submit">Search</button>
      {searchPatient && patient ? (
        <div key={patient.id}>
          <p>{patient.last_name}</p>
          <p>{patient.first_name}</p>
          <p>{patient.birth_date}</p>
        </div>
      ) : (
        <p>Pas de patient trouvé</p>
      )}

        <Link to={`/patient/${patient.id}`}>Voir le patient</Link>
        <Link to={`/patient/${patient.id}/update`}>modifier le patient</Link>
    </>
  );
};

export default SearchPatient;

  

   
