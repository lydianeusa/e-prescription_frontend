import {Link} from "react-router-dom";
import Header from "../../Layout/Header/Header";
import Footer from "../../Layout/Footer/Footer";
import "./Patient.css";

const Patient= () => {
  return (
    <>
    <Header/>
    <main className="patient">
        <div className="container">
          <div className="row">
            <div className="col-12 col-md-12 col-lg-4">
              <button className="btn-1"><Link to="/find-physician">Trouver un médecin</Link></button>
            </div>
            <div className="col-12 col-md-12 col-lg-4">
              <img src="img/patient.png" alt="patient" />
            </div>
            <div className="col-12 col-md-12 col-lg-4">
              <button className="btn-1"><Link to="/find-pharmacy">Trouver une pharmacie</Link></button>
            </div>
          </div>
        </div>
    </main>
    <Footer/>
    </>
  )
};

export default Patient;