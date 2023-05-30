import {Link} from "react-router-dom";
import Header from "./Header"
import Footer from "./Footer";
import "../Styles/Pharmacy.css";

const Pharmacy =()=>{
  return(
    <>
      <Header/>
      <div  className="pharmacy">
        <div class="container">
          <div class="row">
            <div class="col-12 col-md-6 col-lg-6">
              <button className="btn-1"><Link to="/find-patient">Trouver un patient</Link></button>
            </div>
            <div class="col-12 col-md-6 col-lg-6">
              <img src="img/pharmacian.png" alt="Pharmacian" />
            </div>
          </div>
        </div>
      </div>
      <Footer/>
    </>
  )
}

export default Pharmacy;