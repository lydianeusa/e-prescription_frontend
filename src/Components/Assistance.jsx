import Footer from "./Footer";
import Header from "./Header";
import "../Styles/Assistance.css";

const Assistance = () => {
  return (
    <div>
      <Header/>
      <main className="support">
        <h1>Assistance 7 jours sur 7</h1>
        <div class="container">
          <div class="row">
          <div class="col-12 col-md-6 col-lg-6">
              <p>Nous sommes joignables 7 jours sur 7 de 8H00 à 19h00.</p>
              <div className="phone">
                <img className="logo" src="img/phone-logo.png" alt="" />
                <p>01 23 40 00 00</p>
              </div>
            </div>
            <div class="col-12 col-md-6 col-lg-6">
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