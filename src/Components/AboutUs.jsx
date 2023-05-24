import "../Styles/AboutUs.css";
import Header from "./Header";
import Footer from "./Footer";

const AboutUs = () => {
  return (
    <div >
      <Header/>
      <main className="aboutUs">
        <h1>Qui sommes nous?</h1>
        <h2>Notre histoire</h2>
        <p>Fondée en 2023 par le Dr Doner, ce logiciel a rencontré un succès presqu’ immédiat au niveau national.
          Il a d’abord été utilisé localement dans la région bordelaise, où il a été créé.
          Cette success story a été rendue possible par le besoin d’ordonnace digitale et la facilité d’utilisation de ce logiciel. 
        </p>
        <h2>La fondatrice</h2>
        <p>Le Dr Lydiane Doner a acquis des talents en informatique et dans le domaine de la santé.
          Pendant son expérience professionnelle aux USA, elle a utilisé des logiciels d’ordonnances électroniques et a participé à résoudre les problèmes d'utilisation de ces logiciels.
          Les logiciels d'ordonnance éléctronique sont largement utilisés aux USA où la technologie est plus avancée.
        </p>
        <h2>Notre équipe</h2>
        <p>Notre équipe est composée des collaborateurs expérimentés et enthousiasmés par ce projet.</p>
      </main>
      <Footer/>

    </div>
  )
};

export default AboutUs;