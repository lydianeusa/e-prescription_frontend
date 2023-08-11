// import { useEffect, useState } from "react";
// import { useNavigate, Link } from "react-router-dom";
// import Header from "../../Layout/Header/Header";
// import Footer from "../../Layout/Footer/Footer";
// import "./Patient.css";

// const Patient = () => {
//   const navigate = useNavigate();
//   const token = localStorage.getItem("jwt");
//   const roles = localStorage.getItem("roles");

//   const [prescriptions, setPrescriptions] = useState([]);

//   useEffect(() => {
//     if (!token) {
//       navigate("/login");
//       return;
//     }
//     const jwtData = token.split(".")[1];
//     const decodedJwt = JSON.parse(atob(jwtData));
//     const expirationTime = decodedJwt.exp * 1000;
//     const timeoutId = setTimeout(() => {
//       navigate("/login");
//     }, expirationTime - Date.now());
//     return () => clearTimeout(timeoutId);
//   }, [navigate, token]);

//   useEffect(() => {
//     // Fetch the patient's prescriptions using the token
//     fetch("http://localhost:3001/api/patient/prescriptions", {
//       headers: { Authorization: `Bearer ${token}` },
//     })
//       .then((response) => response.json())
//       .then((data) => {
//         setPrescriptions(data.prescriptions);
//       })
//       .catch((error) => {
//         console.error("Error fetching prescriptions:", error);
//       });
//   }, [token]);

//   return (
//     <>
//       <Header />
//       <main className="patient">
//         <div className="container">
//           <div className="row">
//             <div className="col-12 col-md-12 col-lg-4">
//               <button className="btn-1">
//                 <Link to="/find-physician">Trouver un médecin</Link>
//               </button>
//             </div>
//             <div className="col-12 col-md-12 col-lg-4">
//               <img src="img/patient.png" alt="patient" />
//             </div>
//             <div className="col-12 col-md-12 col-lg-4">
//               <button className="btn-1">
//                 <Link to="/find-pharmacy">Trouver une pharmacie</Link>
//               </button>
//             </div>
//           </div>
//         </div>
//         <div className="container">
//           <div className="row">
//             {prescriptions.length > 0 ? (
//               prescriptions.map((prescription) => (
//                 <div className="col-12 col-md-12 col-lg-4" key={prescription.id}>
//                   <button className="btn-1">
//                     <Link to={`/prescription/${prescription.id}`}>
//                       Voir l'ordonnance {prescription.id}
//                     </Link>
//                   </button>
//                 </div>
//               ))
//             ) : (
//               <p className="noPrescription">Pas d'ordonnance trouvée</p>
//             )}
//           </div>
//         </div>
//       </main>
//       <Footer />
//     </>
//   );
// };

// export default Patient;



import Header from "../../Layout/Header/Header";
import Footer from "../../Layout/Footer/Footer";
import "./Patient.css";
import { useEffect, useState } from "react";
import { useNavigate, Link, useLocation, useParams } from "react-router-dom";

const Patient= () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("jwt");
  const roles = localStorage.getItem("roles");
  const patientId = localStorage.getItem("patientId"); 

  useEffect(() => {
    if (!token) {
      navigate("/login");
      return;
    }
    const jwtData = token.split(".")[1];
    const decodedJwt = JSON.parse(atob(jwtData));
    const expirationTime = decodedJwt.exp * 1000; 
    const timeoutId = setTimeout(() => {
      navigate("/login");
    }, expirationTime - Date.now());
    return () => clearTimeout(timeoutId);
  }, [navigate, token]);

const [patientPrescriptions, setPatientPrescriptions] = useState([]);
const [patient, setPatient] = useState(null);

useEffect(() => {
  fetch(`http://localhost:3001/api/patients/${patientId}`, {
    headers: { Authorization: `Bearer ${token}` },
  })
    .then((response) => response.json())
    .then((data) => {
      setPatient(data.data);
      setPatientPrescriptions(data.data.Prescriptions);
    })
    .catch((error) => {
      console.error("Error fetching patient data:", error);
    });
}, [patientId, token]);

const handlePrescriptionClick = (prescription) => {
  navigate(`/prescription/${prescription.id}`, { state: { prescription } });
};

const isAuthorizedUser = roles && (roles.includes("admin") || roles.includes("patient"));

console.log("Prescriptions of patient:", patientPrescriptions); // Log the patient's prescriptions
console.log("Path generated by Link:", patient ? `/prescription/${patient.id}` : "N/A"); 


  return (
    <>
    <Header/>
    <main className="patient">
        <div className="container">
          <div className="row">
            <div className="col-12 col-md-12 col-lg-6">
              <button className="btn-1"><Link to="/find-physician">Trouver un médecin</Link></button>
              <button className="btn-1"><Link to="/find-pharmacy">Trouver une pharmacie</Link></button>
              <img src="img/patient.png" alt="patient" />
            </div>
            {/* <div className="col-12 col-md-12 col-lg-4">
              <img src="img/patient.png" alt="patient" />
            </div> */}
            {/* <div className="col-12 col-md-12 col-lg-4">
              <button className="btn-1"><Link to="/find-pharmacy">Trouver une pharmacie</Link></button>
            </div> */}
            <div className="col-12 col-md-12 col-lg-6">
              <div className="displayPrescription" >
              <h2>Mes ordonnances</h2>
                      {patient &&(
                        <>
                                {patientPrescriptions.map((e) => {
                                  return (
                                    <div key={e.id}>
                                      <div>
                                        {/* <h2>Ordonnance</h2> */}
                                        <p>Médicament : {e.medicine_name}</p>
                                        {/* <p>Dosage : {e.dosage}</p>
                                        <p>Fréquence: {e.frequency}</p>
                                        <p>Durée: {e.duration}</p> */}
                                        <button className="btn-4" onClick={() => handlePrescriptionClick(e)}>
                                          Voir l'ordonnance
                                        </button>
                                      </div>
                                    </div>
                                  )
                                })}
                        </>
                      )}
                      </div>
              </div>
            </div>
        </div>  
    </main>
    <Footer/>
    </>
  )
};

export default Patient;