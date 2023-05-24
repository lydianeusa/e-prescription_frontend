import "../Styles/Header.css";



const Header = () => {
  return (
    <div>
    <header>
            <nav class="navbar navbar-expand-lg navbar-dark">
            <div class="container-fluid">
                <a class="navbar-brand" href="/">
                    <img src="img/e-ordo-12ter.png" alt=""/>
                </a>
                <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav"  aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse justify-content-end" id="navbarNav">
                    <ul class="navbar-nav">
                        <li class="nav-item">
                          <a class="nav-link" href="/">ACCUEIL</a>
                        </li>
                        <li class="nav-item">
                        <a class="nav-link" href="/physician">MEDECIN</a>
                        </li>
                        <li class="nav-item">
                        <a class="nav-link" href="/pharmacy">PHARMACIEN</a>
                        </li>
                        <li class="nav-item">
                        <a class="nav-link" href="/patient">PATIENT</a>
                        </li>
                        <li class="nav-item">
                        <a class="nav-link" href="/assistance">ASSISTANCE</a>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    </header>
    </div>
  )
};

export default Header;