import {Link} from "react-router-dom";
import Header from "./Header"
import Footer from "./Footer";
import "../Styles/Patient.css";

const Patient= () => {
  return (
    <>
    <Header/>
    <main className="patient">
        <ul>
          <li><button className="btn-1"><Link to="/physicianslist">Liste des médecins</Link></button></li>
          <li><button className="btn-1"><Link to="/pharmacieslist">Liste des pharmacies</Link></button></li>
        </ul>
        <img src="img/patient.png" alt="patient" />
    </main>
    <Footer/>
    </>
  )
};

export default Patient;