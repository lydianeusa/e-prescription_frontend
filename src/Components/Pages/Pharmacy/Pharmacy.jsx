import {Link} from "react-router-dom";
import Header from "../../Layout/Header/Header";
import Footer from "../../Layout/Footer/Footer";
import "./Pharmacy.css";

const Pharmacy =()=>{
  return(
    <>
      <Header/>
      <main>
      <div  className="pharmacy">
        <div className="container">
          <div className="row">
            <div className="col-12 col-md-6 col-lg-6">
              <button className="btn-1"><Link to="/find-patient">Trouver un patient</Link></button>
            </div>
            <div className="col-12 col-md-6 col-lg-6">
              <img src="img/pharmacian.png" alt="Pharmacian" />
            </div>
          </div>
        </div>
      </div>
      </main>
      <Footer/>
    </>
  )
}

export default Pharmacy;