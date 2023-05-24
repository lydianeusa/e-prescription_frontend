import Footer from "./Footer";
import Header from "./Header";
import "../Styles/Fees.css";

const Fees = () => {
  return (
    <div>
      <Header/>
      <main>
        <h2>Abonnement à l'année</h2>
        <p className="fees">500 euros pour nos services incluant une assistance 7 jours sur 7</p>
        <div className="phone">
       <img className="logo" src="img/phone-logo.png" alt="" />
       <p>01 23 40 00 00</p>
       </div>
      </main>
      <Footer/>
    </div>
  )
};

export default Fees;