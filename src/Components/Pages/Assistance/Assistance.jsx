import Footer from "../../Layout/Footer/Footer";
import Header from "../../Layout/Header/Header";
import "./Assistance.css";

const Assistance = () => {
  return (
    <div>
      <Header/>
      <main className="support">
        <h1>Assistance 7 jours sur 7</h1>
        <div className="container">
          <div className="row">
          <div className="col-12 col-md-6 col-lg-6">
              <p>Nous sommes joignables 7 jours sur 7 de 8H00 à 19h00.</p>
              <div className="phone">
                <img className="logo" src="img/phone-logo.png" alt="" />
                <p>01 23 40 00 00</p>
              </div>
            </div>
            <div className="col-12 col-md-6 col-lg-6">
                <div className="assistance">
                  <img className="support" src="img/support-client.jpg" alt="" />
                </div>
            </div>        
          </div>
        </div>    
      </main>
      <Footer/>
    </div>
  )
};

export default Assistance;