import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import Header from "../../Layout/Header/Header";
import Footer from "../../Layout/Footer/Footer";
import "./PrescriptionAdmin.css"
  
const PrescriptionAdmin = () => {

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
        const roles = localStorage.getItem("roles");

        const { id } = useParams();
        const [prescription, setPrescription] = useState(null);

        useEffect(() => {
            fetch(`http://localhost:3001/api/prescriptions/${id}`,{
            headers: {Authorization: `Bearer ${token}`}
            })
            .then((responseJson) => responseJson.json())
            .then((responseJs) => {setPrescription(responseJs.data);
            });
        },[id]);

        const handleDeleteClick = (prescription) => {
            fetch("http://localhost:3001/api/prescriptions/" + prescription.id, {
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

        const isAuthorizedUser = roles && (roles.includes("admin") || roles.includes("physician"));

        return (
            <div>
                <Header />
                <main>
                {prescription ? (
                <>
                    <h1>Détail de l'ordonnance</h1>
                    <div className="prescriptionAdmin">
                        <p>Médicament : {prescription.medicine_name}</p>
                        <p>Dosage : {prescription.dosage}</p>
                        <p>Fréquence: {prescription.frequency}</p>
                        <p>Durée: {prescription.duration}</p>

                        {isAuthorizedUser && (
                        <>
                            <button className="btn-4"><Link to={`/prescription/${prescription.id}/update`}>Modifier l'ordonnance</Link></button>
                            <button className="btn-3" onClick={() => handleDeleteClick(prescription)}>Supprimer l'ordonnance</button>
                        </>
                        )}
                    </div>
                </>
                ) : (
                <p className="prescriptionDetail">Pas d'ordonnance trouvée</p>
                )}
                </main>
                <Footer/>
            </div>
        );
}
  
  export default PrescriptionAdmin;

