import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import Header from "../../Layout/Header/Header";
import Footer from "../../Layout/Footer/Footer";
import "./PatientDetail.css";
  
const PatientDetail = () => {
        
        const navigate = useNavigate();
        const token = localStorage.getItem("jwt");
        const roles = localStorage.getItem("roles");

        useEffect(() => {
            if (!token) {
                navigate("/login");
                return;
            }
            // Décode le token JWT pour récupérer la date d'expiration
            const jwtData = token.split(".")[1];
            const decodedJwt = JSON.parse(atob(jwtData));
            const expirationTime = decodedJwt.exp * 1000; // Convertit la date d'expiration en millisecondes
      
            // Redirige vers la page de connexion lorsque le jeton expire
            const timeoutId = setTimeout(() => {
                navigate("/login");
            }, expirationTime - Date.now()); // Définit le délai en millisecondes avant la redirection
      
            // Nettoie le timeout lorsque le composant est démonté
            return () => clearTimeout(timeoutId);
        }, [navigate]);
        
        const [patient, setPatient] = useState(null);
        const { id } = useParams();
        useEffect(() => {
            fetch(`http://localhost:3001/api/patients/${id}`, {
                headers: { "Content-Type": "application/json" ,
                Authorization: `Bearer ${token}`
                },  
            })
            .then((responseJson) => responseJson.json())
            .then((responseJs) => {
                setPatient(responseJs.data);
            });
        },[id, token]);

        
        const handleDeleteClick = (patient) => {
            fetch("http://localhost:3001/api/patients/" + patient.id, {
                method: "DELETE",
                headers: {Authorization: `Bearer ${token}`},
            })
            .then(() => {
                navigate(0);
            })
            .catch((error) => {
                console.log(error);
            });
        };

        console.log(roles);

        return (
            <div>
                <Header />
                <main>
                    {patient ? (
                    <>
                        <h1>Détail du patient</h1>
                        <div className="patientDetail">
                            <h2>{patient.first_name+" "+patient.last_name}</h2>
                            <p>Date de naissance : {patient.birth_date}</p>
                            <p>Adresse mail : {patient.email}</p>
                            <p>Adresse: {patient.address}, {patient.zipcode} {patient.city}</p>
                            <p>Téléphone: {patient.phone_number}</p>
                        </div>
                        <div>
                            <button className="btn-5"><Link to={`/patient/${patient.id}/update`}>Modifier le patient</Link></button> 

                            <button className="btn-3" onClick={() => handleDeleteClick(patient)}>Supprimer le patient</button>
                            <br/>
                            <button className="btn-4"><Link to={`/prescription/${patient.id}`}>Voir l'ordonnance</Link></button>

                            <button className="btn-7"><Link to={`/create-prescription/`}>Créer une ordonnance</Link></button>
                        </div>
                            
                        
                    </>
                    ) : (
                    <p className="noPatientFound">Pas de patient trouvé</p>
                    )}
                </main>
                <Footer/>
            </div>
        );
}
  
  export default PatientDetail;