import { useEffect, useState} from "react";
import { useParams, useNavigate } from "react-router-dom";
import Header from "../../Layout/Header/Header";
import Footer from "../../Layout/Footer/Footer";
import "./UpdatePharmacy.css"


const UpdatePharmacy = () => {

        const navigate = useNavigate();
        const token = localStorage.getItem("jwt");
        const roles = localStorage.getItem("roles");

        console.log("Token:", token);
        console.log("Role:", roles)

  useEffect(() => {
      if (!token) {
          navigate("/login");
          return;
      }
      // Décode le token JWT pour récupérer la date d'expiration
      const jwtData = token.split(".")[1];
      const decodedJwt = JSON.parse(atob(jwtData));
      const expirationTime = decodedJwt.exp * 1000; // Convertit la date d'expiration en millisecondes

      // Redirige vers la page de connexion lorsque le jeton expire
      const timeoutId = setTimeout(() => {
          navigate("/login");
      }, expirationTime - Date.now()); // Définit le délai en millisecondes avant la redirection

      // Nettoie le timeout lorsque le composant est démonté
      return () => clearTimeout(timeoutId);
  }, [navigate]);

  const [pharmacy, setPharmacy]=useState(null)
  const [pharmacyModified, setPharmacyModified] = useState(false); // State to track if the patient has been modified

    const { id } = useParams();
  
    useEffect(() => {
      fetch(`http://localhost:3001/api/pharmacies/${id}`, {
        headers: { "Content-Type": "application/json" ,
        Authorization: `Bearer ${token}`
        },  
    })
        .then((responseJson) => responseJson.json())
        .then((responseJs) => {
          setPharmacy(responseJs.data);
        });
    }, [id, token]);

    console.log("ID:", id); // Check the value of "id" here
  
    const handleSubmit = (event) => {
      event.preventDefault();
  
      const name = event.target.name.value;
      const email = event.target.email.value;
      const address= event.target.address.value;
      const zipcode= event.target.zipcode.value;
      const city= event.target.city.value;
      const phone_number= event.target.phone_number.value;
      const verification_number= event.target.verification_number.value;
  
      fetch(`http://localhost:3001/api/pharmacies/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
            name: name,
            email: email,
            address: address,
            zipcode: zipcode,
            city: city,
            phone_number: phone_number,
            verification_number: verification_number
        }),
      }).then((response) => {
        if (response.status === 200) {
          console.log("information de la pharmacie modifiée");
          setPharmacyModified(true);
        } else {
          console.log("erreur");
          setPharmacyModified(false);
        }
      });
    };

    const handleDeleteClick = (pharmacy) => {
      fetch("http://localhost:3001/api/pharmacies/" + pharmacy.id, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      })
        .then(() => {
          navigate(0);
        })
        .catch((error) => {
          console.log(error);
        });
    };

    return (
        <>
          <Header/>
          <main>
            {pharmacy ? (
              <>
                <h1>Mise à jour de la pharmacie : {pharmacy.name}</h1>
                <form onSubmit={handleSubmit}>
                  <div className="updatePharmacy">
                    <div>
                      <label htmlFor="name">Nom</label><br />
                      <input type="text" name="name" defaultValue={pharmacy.name} />
                    </div>
                    <div>
                      <label htmlFor="email">Email</label><br />
                      <input type="email" name="email" defaultValue={pharmacy.email} />
                    </div>
                      <label htmlFor="address">Numéro et rue</label><br />
                      <input type="text" name="address" defaultValue={pharmacy.address} />
                    <div>
                      <label htmlFor="zipcode">Code postal</label><br />
                      <input type="number" name="zipcode" defaultValue={pharmacy.zipcode} />
                    </div>
                    <div>
                      <label htmlFor="city">Ville</label><br />
                      <input type="text" name="city" defaultValue={pharmacy.city} />
                    </div>
                    <div>
                      <label htmlFor="phone_number">Téléphone</label><br />
                      <input type="number" name="phone_number" defaultValue={pharmacy.phone_number} />
                    </div>
                    <div>
                      <label htmlFor="verification_number">Numéro de licence</label><br />
                      <input type="number" name="verification_number" defaultValue={pharmacy.verification_number} />
                    </div>
        
                    <button type="submit" className="btn-6">Mettre à jour les informations</button>
                  </div>
                </form>
                
                <button className="btn-3" onClick={() => handleDeleteClick(pharmacy)}>
                    Supprimer le pharmacie
                </button>
              </>
            ) : (
              <p>La pharmacie a été supprimé de la base de données.</p>
            )}
            {pharmacyModified && <p>La pharmacie a été modifiée.</p>}
          </main>
          <Footer/>
      </>
    )
  };
  
  export default UpdatePharmacy;