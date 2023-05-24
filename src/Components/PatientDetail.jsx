import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import "../Styles/PatientDetail.css";
  
const PatientDetail = () => {
        const [patient, setPatient] = useState(null);
        const navigate = useNavigate();
  
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
                            <Link to={`/patient/${patient.id}/update`}>Modifier le patient</Link> 
                            <br /> 
                            <Link to={`/prescription/${patient.id}`}>Voir l'ordonnance</Link>
                        </div>
                            <button onClick={() => handleDeleteClick(patient)}>Supprimer le patient</button>
                        
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