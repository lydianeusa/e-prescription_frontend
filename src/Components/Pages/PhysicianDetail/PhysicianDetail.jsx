// import { useEffect, useState} from "react";
// import { useParams, useNavigate, Link } from "react-router-dom";
// import Header from "../../Layout/Header/Header";
// import Footer from "../../Layout/Footer/Footer";
// import "./PatientDetail.css";
  
// const PatientDetail = () => {
        
//         const navigate = useNavigate();
//         const token = localStorage.getItem("jwt");
//         const roles = localStorage.getItem("roles");

//         useEffect(() => {
//             if (!token) {
//                 navigate("/login");
//                 return;
//             }
//             // Décode le token JWT pour récupérer la date d'expiration
//             const jwtData = token.split(".")[1];
//             const decodedJwt = JSON.parse(atob(jwtData));
//             const expirationTime = decodedJwt.exp * 1000; // Convertit la date d'expiration en millisecondes
      
//             // Redirige vers la page de connexion lorsque le jeton expire
//             const timeoutId = setTimeout(() => {
//                 navigate("/login");
//             }, expirationTime - Date.now()); // Définit le délai en millisecondes avant la redirection
      
//             // Nettoie le timeout lorsque le composant est démonté
//             return () => clearTimeout(timeoutId);
//         }, [navigate]);

    
//         const [patient, setPatient] = useState(null);
//         const { id } = useParams();
//         useEffect(() => {
//             fetch(`http://localhost:3001/api/patients/${id}`, {
//                 headers: { "Content-Type": "application/json" ,
//                 Authorization: `Bearer ${token}`
//                 },  
//             })
//             .then((responseJson) => responseJson.json())
//             .then((responseJs) => {setPatient(responseJs.data)},
//             [id, token]);

        
//         const handleDeleteClick = (patient) => {
//             fetch("http://localhost:3001/api/patients/" + patient.id, {
//                 method: "DELETE",
//                 headers: {Authorization: `Bearer ${token}`},
//             })
//             .then(() => {
//                 navigate(0);
//             })
//             .catch((error) => {
//                 console.log(error);
//             });
//         };

//         // console.log(roles);

//         const isAdmin = roles && roles.includes("admin");
//         const isAuthorizedUser = roles && (roles.includes("admin") || roles.includes("physician"));

//         return (
//             <div>
//                 <Header />
//                 <main>
//                     {patient ? (
//                     <>
//                         <h1>Détail du patient</h1>
//                         <div className="patientDetail">
//                             <h2>{patient.first_name+" "+patient.last_name}</h2>
//                             <p>Date de naissance : {patient.birth_date}</p>
//                             <p>Adresse mail : {patient.email}</p>
//                             <p>Adresse: {patient.address}, {patient.zipcode} {patient.city}</p>
//                             <p>Téléphone: {patient.phone_number}</p>
//                         </div>
//                         <div>
//                             <button className="btn-4">
//                                 <Link to={`/prescription/${patient.id}`}>
//                                     Voir l'ordonnance
//                                 </Link>
//                             </button>

//                             {isAuthorizedUser && (
//                                 <button className="btn-7">
//                                 <Link to={`/create-prescription/`}>Créer une ordonnance</Link>
//                                 </button>
//                             )}

//                             {isAdmin && (
//                                 <>
                                
//                                     <button className="btn-5"><Link to={`/patient/${patient.id}/update`}>Modifier le patient</Link></button> 

//                                     <button className="btn-3" onClick={() => handleDeleteClick(patient)}>Supprimer le patient</button>
//                                 </>
//                             )}
//                         </div>
 
//                     </>
//                     ) : (
//                     <p className="noPatientFound">Pas de patient trouvé</p>
//                     )}
//                 </main>
//                 <Footer/>
//             </div>
//         );
// }
  
//   export default PatientDetail;


import React, { useEffect, useState } from "react";
import { useNavigate, Link, useParams} from "react-router-dom";
import Header from "../../Layout/Header/Header";
import Footer from "../../Layout/Footer/Footer";
import "./PhysicianDetail.css";

const PhysicianDetail = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("jwt");
  const roles = localStorage.getItem("roles");

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
  }, []);

  const [physician, setPhysician] = useState(null);
        const { id } = useParams();
        useEffect(() => {
            fetch(`http://localhost:3001/api/physicians/${id}`, {
                headers: { "Content-Type": "application/json" ,
                Authorization: `Bearer ${token}`
                },  
            })
            .then((responseJson) => responseJson.json())
            .then((responseJs) => {setPhysician(responseJs.data)},
            [id, token]);
        });

  const handleDeleteClick = (physician) => {
    fetch("http://localhost:3001/api/physicians/" + physician.id, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(() => {
        navigate(0);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const isAdmin = roles && roles.includes("admin");

  return (
    <div>
      <Header />
      <main>
        {physician ? (
          <>
            <h1>Détail du médecin</h1>
            <div className="physicianDetail">
              <h2>{physician.first_name + " " + physician.last_name}</h2>
              <p>Numéro de licence : {physician.verification_number}</p>
              <p>Adresse mail : {physician.email}</p>
              <p>Adresse: {physician.address}, {physician.zipcode} {physician.city}</p>
              <p>Téléphone: {physician.phone_number}</p>
            </div>
            <div>

              {isAdmin && (
                <>
                  <button className="btn-5">
                    <Link to={`/physician/${physician.id}/update`}>Modifier le médecin</Link>
                  </button>

                  <button className="btn-3" onClick={() => handleDeleteClick(physician)}>
                    Supprimer le médecin
                  </button>
                </>
              )}
            </div>
          </>
        ) : (
          <p className="noPatientFound">Pas de médecin trouvé</p>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default PhysicianDetail;

