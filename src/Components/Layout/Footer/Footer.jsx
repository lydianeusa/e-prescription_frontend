import "./Footer.css";

const Footer= () => {
  return (
    <footer>
              <div className="container">
            <div className="row">
                <div className="col-12 col-md-2 text-center">
                    <a href="/"><img src="/img/e-ordo-12ter.png" alt="logo"/></a>
                </div>
                <div className="col-12 col-md-4 text-center">
                    <ul className="menu">
                        <li><a href="/about-us">A propos</a></li>
                        <li><a href="/assistance">Assistance</a></li>
                        <li><a href="/fees">Tarifs</a></li>
                        <li><a href="/delivery">Livraisons</a></li>
                        <li><a href="/mobile">Application mobile</a></li>
                    </ul>
                </div>
                <div className="col-12 col-md-4 text-center">
                    <p>CONTACTEZ-NOUS</p>
                    <ul>
                        <li>43 rue Boursault</li>
                        <li>75017 Paris</li>
                        <li>01 40 05 94 10</li>
                        <li>info@e-prescription.fr</li>
                    </ul>
                </div>
                <div className="col-12 col-md-2 text-center">
                    <div className="logo"> 
                        <a className="facebook" href="/"><i className="fa-brands fa-facebook"></i></a>
                        <a className="instagram" href="/"><i className="fa-brands fa-square-instagram"></i></a>
                    </div>
                </div>

                <div className="col-12 text-center">
                    <a className="RGPD" href="https://www.cnil.fr/fr/reglement-europeen-protection-donnees">
                        © 2020 studio-creacom.fr Charlène Tavares - Mentions légales
                    </a>
                </div>
            </div>
        </div>
    </footer>
  )
};

export default Footer;