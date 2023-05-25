import {Link} from "react-router-dom";
import Header from "./Header"
import Footer from "./Footer";
import "../Styles/Pharmacy.css";

const Pharmacy =()=>{
  return(
    <>
    <Header/>
    <main className="pharmacy">
      <ul>
        <li><button className="btn-1"><Link to="/patientslist">Lise des patients</Link></button></li>
        <li><button className="btn-1"><Link to="/prescriptionslist">Liste des ordonnances</Link></button></li>
      </ul>
      <img src="img/pharmacian.png" alt="Pharmacian" />
    </main>
    <Footer/>
    </>
  )
}

export default Pharmacy;