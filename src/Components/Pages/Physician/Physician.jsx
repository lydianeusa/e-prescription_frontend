import {Link} from "react-router-dom";
import Header from "../../Layout/Header/Header";
import Footer from "../../Layout/Footer/Footer";
import "./Physician.css";

const Physician =()=>{
  return(
    <>
      <Header />
      <main className="physician">
        <div className="container">
          <div className="row">
            <div className="col-12 col-md-12 col-lg-4">
              <button className="btn-1"><Link to="/find-patient">Trouver un patient</Link></button>
            </div>
            <div className="col-12 col-md-12 col-lg-4">
              <img src="img/physicianter.png" alt="" />
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
}

export default Physician;