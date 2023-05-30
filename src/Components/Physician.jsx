import {Link} from "react-router-dom";
import Header from "./Header"
import Footer from "./Footer";
import "../Styles/Physician.css";

const Physician =()=>{
  return(
    <>
      <Header />
      <main className="physician">
        <div class="container">
          <div class="row">
            <div class="col-12 col-md-12 col-lg-4">
              <button className="btn-1"><Link to="/find-patient">Trouver un patient</Link></button>
            </div>
            <div class="col-12 col-md-12 col-lg-4">
              <button className="btn-1"><Link to="/create-patient">Créer un patient</Link></button>
            </div>
            <div class="col-12 col-md-12 col-lg-4">
              <button className="btn-1"><Link to="/create-prescription">Créer une ordonnance</Link></button>
            </div>
            <div class="col-12 col-md-12 col-lg-12">
              <img src="img/physicianter.png" alt="" />
            </div>
          </div>
        </div>
      </main>
      <Footer/>
    </>
  )
}

export default Physician;