import {Link} from "react-router-dom";
import Header from "./Header"
import Footer from "./Footer";
import "../Styles/Patient.css";

const Patient= () => {
  return (
    <>
    <Header/>
    <main className="patient">
        <div class="container">
          <div class="row">
            <div class="col-12 col-md-6 col-lg-4">
              <button className="btn-1"><Link to="/find-physician">Trouver un médecin</Link></button>
            </div>
            <div class="col-12 col-md-4 col-lg-4">
              <img src="img/patient.png" alt="patient" />
            </div>
            <div class="col-12 col-md-6 col-lg-4">
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