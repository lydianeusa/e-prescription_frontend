import {Link} from "react-router-dom";
import Header from "./Header"
import Footer from "./Footer";
import "../Styles/Physician.css";

const Physician =()=>{
  return(
    <>
      <Header />
      <main className="physician">
        <ul>
          <li><Link to="/pharmacieslist/">Liste des pharmacie</Link></li>
          <li><Link to="/patientslist/">Liste des patients</Link></li>
          <li><Link to="/create-patient">Créer un patient</Link></li>
          <li><Link to="/prescriptionslist">Liste des ordonnances</Link></li>
          <li><Link to="/create-prescription">Créer une ordonnance</Link></li>
        </ul>
      </main>
      <Footer/>
    </>
  )
}

export default Physician;