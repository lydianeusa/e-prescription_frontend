import Header from "./Header"
import Footer from "./Footer";
import "../Styles/Home.css";

const Home =()=>{
  return (
    <div>
      <Header/>
      <main>
        <section id="banner">
          <div className="container_fluid">
            <h1>L'ORDONNANCE DIGITALE</h1>
            <div className="mobile">
                <img src="img/mobile-white.png" alt="" />
                <a href="/mobile"><button>Application mobile</button></a>
            </div>
          </div>
        </section>

        <section id="presentation">
            <div class="container">
                <div class="row">
                    <div class="col-12">
                        <h2>L'ORDONNANCE DIGITALE</h2>
                        <h3 className="purple">POURQUOI UTILISER UNE ORDONNANCE DIGITALE?</h3>
                        <p>
                            <ul class="advantages">
                                <li>Plus de papiers oubliés, perdus, tâchés.</li>
                                <li className="purple">Facile à utiliser avec <a href="/mobile">l'application </a>e-prescription et notre service assistance joignable 7/7.
                                </li>
                                <li>Transmission instantanée entre le médecin et le pharmacien. <br></br>
                                    Le pharmacien peut préparer l'ordonnance à l'avance. Ceci réduit le temps d'attente pour le client à la pharmacie et permet une meilleure gestion du flux de client pour la pharmacie.
                                    De plus, si un médicament doit être commandé, ceci évite au patient à avoir à revenir.
                                </li>
                                <li className="purple">Finalement, les risques de falsification d'ordonnance sont considérablement réduits.</li>
                            </ul>
                        </p>
                    </div>
                </div>
            </div>
        </section>
        
        <section id="video">
            <div class="container">
                <div class="row">
                    <div class="col-12">
                        <h2>COMMENT CA MARCHE?</h2>
                        <iframe width="700" height="500" src="https://www.youtube-nocookie.com/embed/P74u1ToAT5c" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe> 
                    </div>
                </div>
            </div>
        </section>

        <section id="services">
            <div class="container">
                <div class="row">
                    <div class="col-12">
                        <h2>SERVICES</h2>
                    </div>
                    <div class="container">
                        <div class="row">
                            <div class="col-12 col-md-6 col-lg-4">
                                <a href="/mobile"><img class="img-fluid" src="img/mobile.png" alt=""/>
                                <h3>APPLICATION</h3></a>
                            </div>
                            <div class="col-12 col-md-6 col-lg-4">
                                <a href="/physicianslist"><img class="img-fluid" src="img/doctorbis.png" alt=""/>
                                <h3>TROUVER UN MEDECIN</h3></a>
                            </div>
                            <div class="col-12 col-md-6 col-lg-4">
                                <a href="/pharmacieslist"><img class="img-fluid" src="img/pharmacie.webp" alt=""/>
                                <h3>TROUVER UNE PHARMACIE</h3></a>
                            </div>
                            <div class="col-12 col-md-6 col-lg-4">
                                <a href="/delivery"><img class="img-fluid" src="img/delivery.png" alt=""/>
                                <h3>LIVRAISON</h3></a>
                            </div>
                            <div class="col-12 col-md-6 col-lg-4">
                                <a href="/assistance"><img class="img-fluid" src="img/support.webp" alt=""/>
                                <h3>ASSISTANCE</h3></a>
                            </div>
                            <div class="col-12 col-md-6 col-lg-4">
                                <a href="/fees"><img class="img-fluid" src="img/euro.png" alt=""/>
                                <h3>TARIFS</h3></a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <section id="testimonials">
            <div class="container">
                <div class="row">
                    <div class="col-12">
                        <h2>TESTIMONIALS</h2>
                    </div>
                    <div class="container">
                        <div class="row">
                            <div class="col-12 col-md-6 col-lg-4"> 
                                <h3>Patient J. M. de Bordeaux</h3>
                                <p>Fini les ordonnances perdues
                                    ca laisse le temps à la pharmacie de commander un produit qu’ils n’ont pas et je n’y vais qu’une fois que tout est prêt.
                                </p>
                            </div>
                            <div class="col-12 col-md-6 col-lg-4"> 
                                <h3>Médecin B. L. de Béziers</h3>
                                <p>
                                    Fini les ordonnances à refaire car le patient ou le pharmacien les a perdues
                                </p>
                            </div>
                            <div class="col-12 col-md-6 col-lg-4"> 
                                <h3>Pharmacien A. M. de Marseille</h3>
                                <p>On a du temps pour préparer la commande, moins de temps à attendre pour les clients.</p>
                            </div>
                            <div class="col-12 col-md-6 col-lg-4"> 
                                <h3>Médecin B. V. de Lyon</h3>
                                <p>Facile à utiliser</p>
                            </div>
                            <div class="col-12 col-md-6 col-lg-4"> 
                                <h3>Patient B. N. de Toulouse</h3>
                                <p>Disponible sur mon téléphone portable</p>
                            </div>
                            <div class="col-12 col-md-6 col-lg-4"> 
                                <h3>Pharmacien N. X. de Narbonne</h3>
                                <p>Véracité des informations</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
      </main>
      <Footer/>
      
    </div>)
}

export default Home;