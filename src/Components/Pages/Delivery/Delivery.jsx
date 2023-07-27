import Footer from "../../Layout/Footer/Footer";
import Header from "../../Layout/Header/Header";
import "./Delivery.css";

const Delivery = () => {
  return (
    <div>
      <Header/>
        <div className="container">
          <div className="row">
              <div className="col-12">
                <main className="delivery">
                      <h1>Services de livraisons</h1>
                      <p>Nos partenaires sont disponibles pour vous apporter vos médicaments rapidements sans vous déplacer.</p>
                      <ul>
                        <li><span>Tous vos médicaments et produits de pharmacie, avec ou sans ordonnance, livrés en 2h chez vous<br></br> <a href="https://phacil.delivery/">https://phacil.delivery/</a></span></li>
                        <li>Votre livraison de médicaments à domicile en 1 heure<br></br><a href="https://www.ramsayservices.fr/presentation-livraison-medicaments">https://www.ramsayservices.fr/presentation-livraison-medicaments</a></li>
                        <li>Vous êtes cloué au lit ? Faites vous livrer vos médicaments rapidement en 3 clics !<br></br><a href="https://yoojo.fr/aide-a-domicile/livraison-de-medicaments">https://yoojo.fr/aide-a-domicile/livraison-de-medicaments</a></li>
                        <li>Pharmacodel.com, c'est plus de 25000 références disponibles quotidiennement 24h/24h<br></br> <a href="https://www.pharmacodel.com/fr/">https://www.pharmacodel.com/fr/</a></li>
                      </ul>
                </main>
            </div>
          </div>
        </div>
      <Footer/>
    </div>
  )
};

export default Delivery