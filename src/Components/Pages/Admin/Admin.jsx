import Footer from "../../Layout/Footer/Footer";
import Header from "../../Layout/Header/Header";
import {Link} from "react-router-dom";
import "./Admin.css"


const Admin = () => {
    return (
      <div>
        <Header/>
        <main className="admin">
          <div>
            <h2>Patient</h2>
            <Link to="/patientslist"><button className="btn-3">Liste patients</button></Link>
            <Link to="/find-patient"><button className="btn-3">Trouver un patient</button></Link>
            <Link to="/create-patient"><button className="btn-3">Créer un patient</button></Link>
          </div>
            
          <div>
            <h2>Pharmacie</h2>
            <Link to="/pharmacieslist"><button className="btn-4">Liste pharmacies</button></Link>
            <Link to="/find-pharmacy"><button className="btn-4">Trouver une pharmacie</button></Link>
            <Link to="/create-pharmacy"><button className="btn-4">Créer une pharmacie</button></Link>
          </div>
          <div>
            <h2>Médecin</h2>
            <Link to="/physicianslist"><button className="btn-3">Liste médecins</button></Link>
            <Link to="/find-physician"><button className="btn-3">Trouver un médecin</button></Link>
            <Link to="/create-physician"><button className="btn-3">Créer un médecin</button></Link>
          </div>
          <div>
            <h2>Ordonnance</h2>
            <Link to="/prescriptionslist"><button className="btn-4">Liste ordonnances</button></Link>
            <Link to="/create-prescription"><button className="btn-4">Créer ordonnance</button></Link>
            <Link to="/prescription-admin/:id"><button className="btn-4">Voir une ordonnance</button></Link>
          </div>

        </main>
        <Footer/>
      </div>
    )
  };
  
  export default Admin;