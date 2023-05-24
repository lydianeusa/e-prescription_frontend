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
        <li><Link to="/patientslist/">Lise des patients</Link></li>
        <li><Link to="/prescriptionslist">Liste des ordonnances</Link></li>
    </ul>
    </main>
    <Footer/>
    </>
  )
}

export default Pharmacy;