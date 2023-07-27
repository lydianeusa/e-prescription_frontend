import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import Header from "../../Layout/Header/Header";
import Footer from "../../Layout/Footer/Footer";
import "./PatientDetail.css";
  
const PatientDetail = () => {
        
        const navigate = useNavigate();
        useEffect(() => {
            const token = localStorage.getItem("jwt");
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

        const token = localStorage.getItem("jwt");
        
        const [patient, setPatient] = useState(null);
        const { id } = useParams();
        useEffect(() => {
            fetch(`http://localhost:3001/api/patients/${id}`)
            .then((responseJson) => responseJson.json())
            .then((responseJs) => {setPatient(responseJs.data);
            });
        },[id]);

        
        const handleDeleteClick = (patient) => {
            fetch("http://localhost:3001/api/patients/" + patient.id, {
                method: "DELETE",
                headers: {"Authorization": `Bearer ${token}`},
            })
            .then(() => {
                navigate(0);
            })
            .catch((error) => {
                console.log(error);
            });
        };
  
        return (
            <div>
                <Header />
                <main>
                    {patient ? (
                    <>
                        <h1>Détail du patient</h1>
                        <div>
                            <h2>{patient.first_name+" "+patient.last_name}</h2>
                            <p>date de naissance : {patient.birth_date}</p>
                            <p>email : {patient.email}</p>
                        </div>
                        <div>
                            <button className="btn-5"><Link to={`/patient/${patient.id}/update`}>Modifier le patient</Link></button> 
                            <br /> 
                            <button className="btn-3" onClick={() => handleDeleteClick(patient)}>Supprimer le patient</button>
                            <br/>
                            <button className="btn-4"><Link to={`/prescription/${patient.id}`}>Voir l'ordonnance</Link></button>
                            <br/>
                            <button className="btn-7"><Link to="/create-prescription">Créer une ordonnance</Link></button>
                        </div>
                            
                        
                    </>
                    ) : (
                    <p>Pas de patient trouvé</p>
                    )}
                </main>
                <Footer/>
            </div>
        );
}
  
  export default PatientDetail;