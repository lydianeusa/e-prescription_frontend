import Header from "./Header";
import Footer from "./Footer";
import "../Styles/MobileApp.css";

const MobileApp= () => {
  return (
    <div>
      <Header/>
      <h1>L'application mobile</h1>
      <div className="mobilePic">
        <img src="img/mobileapp.png" alt="" />
    <p>Comment ça fonctionne ? <br></br>Après la consultation, le médecin peut directement signer la prescription médicale du patient depuis l’outil. L’ordonnance est ensuite disponible 24h/24 et 7j/7 sur le compte en ligne du patient qui se connecte à la plateforme grâce à sa carte vitale. Ensuite, pour retirer ses médicaments en pharmacie par exemple, il doit simplement communiquer au pharmacien « le code ordonnance » délivré sur son espace personnel. De plus, avec Ordoclic, il est également possible d’accéder à des séances de téléconsultation médicale, de prendre un rendez-vous en urgence avec son praticien ou encore de gérer et d’accéder à son dossier médical de manière sécurisé.</p>
    </div>
    <Footer/>
    </div>
  )
};

export default MobileApp;