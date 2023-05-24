import "../Styles/Footer.css";

const Footer= () => {
  return (
    <footer>
              <div class="container">
            <div class="row">
                <div class="col-12 col-md-4">
                    <img src="img/e-ordo-12ter.png" alt=""/>
                </div>
                <div class="col-12 col-md-3">
                    <ul>
                        <li><a href="/about-us">A propos</a></li>
                        <li><a href="/assistance">Assistance</a></li>
                        <li><a href="/fees">Tarifs</a></li>
                        <li><a href="/delivery">Livraisons</a></li>
                        <li><a href="/mobile">Application mobile</a></li>
                        <li><a href="/physicianslist">Trouver un médecin</a></li>
                        <li><a href="/pharmacieslist">Trouver une pharmacie</a></li>
                    </ul>
                </div>
                <div class="col-12 col-md-3">
                    <p>CONTACTEZ-NOUS</p>
                    <ul>
                        <li>43 rue Boursault</li>
                        <li>75017 Paris</li>
                        <li>01 40 05 94 10</li>
                        <li>info@e-prescription.fr</li>
                    </ul>
                </div>
                <div class="col-12 col-md-2">
                    <div class="logo"> 
                        <a class="facebook" href="/"><i class="fa-brands fa-facebook"></i></a>
                        <a class="instagram" href="/"><i class="fa-brands fa-square-instagram"></i></a>
                    </div>
                </div>

                <div class="col-12 text-center">
                    © 2020 studio-creacom.fr Charlène Tavares - Mentions légales
                </div>
            </div>
        </div>
    </footer>
  )
};

export default Footer;