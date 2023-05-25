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
          <li><button className="btn-1"><Link to="/pharmacieslist">Liste des pharmacies</Link></button></li>
          <li><button className="btn-1"><Link to="/patientslist">Liste des patients</Link></button></li>
          <li><button className="btn-1"><Link to="/create-patient">Créer un patient</Link></button></li>
          <li><button className="btn-1"><Link to="/create-prescription">Créer une ordonnance</Link></button></li>
        </ul>
        <img src="img/physicianter.png" alt="" />
      </main>
      <Footer/>
    </>
  )
}

export default Physician;