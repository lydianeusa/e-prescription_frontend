import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
  
const PrescriptionDetail = () => {
        const [prescription, setPrescription] = useState(null);
        const navigate = useNavigate();
        const { id } = useParams();

        useEffect(() => {
            fetch(`http://localhost:3001/api/prescriptions/${id}`)
            .then((responseJson) => responseJson.json())
            .then((responseJs) => {setPrescription(responseJs.data);
            });
        },[id]);

        const handleDeleteClick = (prescription) => {
            fetch("http://localhost:3001/api/prescriptions/" + prescription.id, {
                method: "DELETE",
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
                {prescription ? (
                <>
                    <h1>Détail de l'ordonnance</h1>
                    <div>
                    <p>Médicament : {prescription.medicine_name}</p>
                    <p>Dosage : {prescription.dosage}</p>
                    <p>Fréquence: {prescription.frequency}</p>
                    <p>Durée: {prescription.duration}</p>
                        <Link to={`/prescription/${prescription.id}/update`}>Modifier l'ordonannce</Link>
                        <button onClick={() => handleDeleteClick(prescription)}>Supprimer l'ordonannce</button>
                    </div>
                </>
                ) : (
                <p>Pas d'ordonannce trouvé</p>
                )}
                </main>
                <Footer/>
            </div>
        );
}
  
  export default PrescriptionDetail;