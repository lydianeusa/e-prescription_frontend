import Header from "../../Layout/Header/Header";
import Footer from "../../Layout/Footer/Footer";
import particlesConfig from "./Particles";
import { useEffect } from "react";
import "./Home.css";

const Home =()=>{
    useEffect(() => {
        if (window.particlesJS) {
            setTimeout(() => {
              window.particlesJS('particles-js', particlesConfig);
            }, 0);
          }
        }, []);
      

  return (
    <div>
      <Header/>
      <main>
        <section id="banner">
          <div id="particles-js"></div> {/* This div will hold the particles animation */}
            <div className="container">
                <div className="count-particles">
                    <span className="js-count-particles"></span>
                    <div className="row">
                        <div className="col-12 col-md-12 col-lg-6">
                            <h1>L'ORDONNANCE DIGITALE</h1>
                        </div>
                        <div className="col-12 col-md-12 col-lg-3">
                        </div>
                        <div className="col-12 col-md-12 col-lg-3">
                            <div className="mobile">
                                <a href="/mobile">
                                    <img src="img/mobile-white.png" alt="mobile" />
                                </a>
                                <a href="/mobile">
                                    <button>Application mobile</button>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <section id="presentation">
            <div className="container">
                <div className="row">
                    <div className="col-12">
                        <h2>L'ORDONNANCE DIGITALE</h2>
                        <h3 className="purple">POURQUOI UTILISER UNE ORDONNANCE DIGITALE?</h3>
                            <ul className="advantages">
                                <li>Plus de papiers oubliés, perdus, tâchés.</li>
                                <li className="purple">Facile à utiliser avec <a href="/mobile">l'application </a>e-prescription et notre service assistance joignable 7/7.
                                </li>
                                <li>Transmission instantanée entre le médecin et le pharmacien. <br></br>
                                    Le pharmacien peut préparer l'ordonnance à l'avance. Ceci réduit le temps d'attente pour le client à la pharmacie et permet une meilleure gestion du flux de client pour la pharmacie.
                                    De plus, si un médicament doit être commandé, ceci évite au patient à avoir à revenir.
                                </li>
                                <li className="purple">Finalement, les risques de falsification d'ordonnance sont considérablement réduits.</li>
                            </ul>
                    </div>
                </div>
            </div>
        </section>
        
        <section id="video">
            <div className="container">
                <div className="row">
                    <div className="col-12">
                        <h2>COMMENT CA MARCHE?</h2>
                        <iframe width="560" height="315" src="https://www.youtube-nocookie.com/embed/P74u1ToAT5c" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen></iframe> 
                    </div>
                </div>
            </div>
        </section>

        <section id="services">
            <div className="container">
                <div className="row d-flex justify-content-center">
                    <h2>SERVICES</h2>
                    <div className="col-12 col-md-4 col-lg-3">
                        <a href="/mobile"><img className="img-fluid" src="img/mobile.png" alt=""/>
                            <h3>APPLICATION</h3>
                        </a>
                    </div>
                    <div className="col-12 col-md-4 col-lg-3">
                        <a href="/find-physician"><img className="img-fluid" src="img/doctorbis.png" alt=""/>
                            <h3>TROUVER UN MEDECIN</h3>
                        </a>
                    </div>
                    <div className="col-12 col-md-4 col-lg-3">
                        <a href="/find-pharmacy"><img className="img-fluid" src="img/pharmacie.webp" alt=""/>
                            <h3>TROUVER UNE PHARMACIE</h3>
                        </a>
                    </div>
                    <div className="col-12 col-md-4 col-lg-3">
                        <a href="/delivery"><img className="img-fluid" src="img/truck1.png" alt=""/>
                            <h3>LIVRAISON</h3>
                        </a>
                    </div>
                    <div className="col-12 col-md-4 col-lg-3">
                        <a href="/assistance"><img className="img-fluid" src="img/support.webp" alt=""/>
                            <h3>ASSISTANCE</h3>
                        </a>
                    </div>
                    <div className="col-12 col-md-4 col-lg-3">
                        <a href="/fees"><img className="img-fluid" src="img/euro_symbol.png" alt=""/>
                            <h3>TARIFS</h3>
                        </a>
                    </div>
                </div>
            </div>
        </section>

        <section id="testimonials">
            <div className="container">
                <div className="row">
                    <div className="col-12">
                        <h2>RECOMMANDATIONS</h2>
                    </div>
                    <div className="container">
                        <div className="row">
                            <div className="col-12 col-md-6 col-lg-4 testimonial" style= {{backgroundColor: "#F8D4AE"}}> 
                                <h3>Patient J. M. de Bordeaux</h3>
                                <p>Fini les ordonnances perdues
                                    ca laisse le temps à la pharmacie de commander un produit qu’ils n’ont pas et je n’y vais qu’une fois que tout est prêt.
                                </p>
                            </div>
                            <div className="col-12 col-md-6 col-lg-4 testimonial"> 
                                <h3>Médecin B. L. de Béziers</h3>
                                <p>
                                    Fini les ordonnances à refaire car le patient ou le pharmacien les a perdues.
                                </p>
                            </div>
                            <div className="col-12 col-md-6 col-lg-4 testimonial" style= {{backgroundColor: "#F8D4AE"}}> 
                                <h3>Pharmacien A. M. de Marseille</h3>
                                <p>Véracité des informations de l'ordonnance;</p>
                            </div>
                            <div className="col-12 col-md-6 col-lg-4 testimonial"> 
                                <h3>Médecin B. V. de Lyon</h3>
                                <p>Facile à utiliser</p>
                            </div>
                            <div className="col-12 col-md-6 col-lg-4 testimonial" style= {{backgroundColor: "#F8D4AE"}}> 
                                <h3>Patient B. N. de Toulouse</h3>
                                <p>Disponible sur mon téléphone portable.</p>
                            </div>
                            <div className="col-12 col-md-6 col-lg-4 testimonial"> 
                                <h3>Pharmacien N. X. de Narbonne</h3>
                                <p>On a du temps pour préparer la commande, moins de temps à attendre pour les clients.</p>
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