import { useEffect, useState} from "react";
import { useParams, useNavigate } from "react-router-dom";
import Header from "../../Layout/Header/Header";
import Footer from "../../Layout/Footer/Footer";
import "./UpdatePhysician.css"


const UpdatePhysician = () => {

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
      const jwtData = token.split(".")[1];
      const decodedJwt = JSON.parse(atob(jwtData));
      const expirationTime = decodedJwt.exp * 1000;
      const timeoutId = setTimeout(() => {
          navigate("/login");
      }, expirationTime - Date.now());
      return () => clearTimeout(timeoutId);
  }, [navigate]);

  const [physician, setPhysician]=useState(null)
  const [physicianModified, setPhysicianModified] = useState(false);

    const { id } = useParams();
  
    useEffect(() => {
      fetch(`http://localhost:3001/api/physicians/${id}`, {
        headers: { "Content-Type": "application/json" ,
        Authorization: `Bearer ${token}`
        },  
    })
        .then((responseJson) => responseJson.json())
        .then((responseJs) => {
          setPhysician(responseJs.data);
        });
    }, [id, token]);

    console.log("ID:", id); // Check the value of "id" here
  
    const handleSubmit = (event) => {
      event.preventDefault();
  
      const first_name = event.target.first_name.value;
      const last_name = event.target.last_name.value;
      const verification_number = event.target.verification_number.value;
      const specialty = event.target.specialty.value;
      const email = event.target.email.value;
      const address= event.target.address.value;
      const zipcode= event.target.zipcode.value;
      const city= event.target.city.value;
      const phone_number= event.target.phone_number.value;
  
      fetch(`http://localhost:3001/api/physicians/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
            first_name: first_name,
            last_name: last_name,
            verification_number: verification_number,
            specialty: specialty,
            email: email,
            address: address,
            zipcode: zipcode,
            city: city,
            phone_number: phone_number,
          }),
        }).then((response) => {
        if (response.status === 200) {
          console.log("information du médecin modifiée");
          setPhysicianModified(true);
        } else {
          console.log("erreur");
          setPhysicianModified(false);
        }
      });
    };

      const handleDeleteClick = (physician) => {
      fetch("http://localhost:3001/api/physicians/" + physician.id, {
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

            {physician ? (
              <>
                <h1>Mise à jour du médecin : {physician.last_name+" "+physician.first_name}</h1>
                <form onSubmit={handleSubmit}>
                  <div className="updatePhysician">
                    <div>
                      <label htmlFor="first_name">Prénom</label><br />
                      <input type="text" name="first_name" defaultValue={physician.first_name} />
                    </div>
                    <div>
                      <label htmlFor="last_name">Nom</label><br />
                      <input type="text" name="last_name" defaultValue={physician.last_name} />
                    </div>
                    <div>
                      <label htmlFor="specialty">Spécialité</label><br />
                      <input type="text" name="specialty" defaultValue={physician.specialty} />
                    </div>
                    <div>
                      <label htmlFor="verification_number">Numéro de licence</label><br />
                      <input type="number" name="verification_number" defaultValue={physician.verification_number} />
                    </div>
                    <div>
                      <label htmlFor="email">Email</label><br />
                      <input type="email" name="email" defaultValue={physician.email} />
                    </div>
                      <label htmlFor="address">Numéro et rue</label><br />
                      <input type="text" name="address" defaultValue={physician.address} />
                    <div>
                      <label htmlFor="zipcode">Code postal</label><br />
                      <input type="number" name="zipcode" defaultValue={physician.zipcode} />
                    </div>
                    <div>
                      <label htmlFor="city">Ville</label><br />
                      <input type="text" name="city" defaultValue={physician.city} />
                    </div>
                    <div>
                      <label htmlFor="phone_number">Téléphone</label><br />
                      <input type="number" name="phone_number" defaultValue={physician.phone_number} />
                    </div>
        
                    <button type="submit" className="btn-6">Mettre à jour les informations du médecin</button>
                  </div>
                </form>
                <button className="btn-3" onClick={() => handleDeleteClick(physician)}>
                    Supprimer le médecin                
                </button>
              </>
            ) : (
              <p>Le médecin a été supprimé de la base de données.</p>
            )}
            {physicianModified && <p>Le médecin a été modifié.</p>}
          </main>
          <Footer/>
      </>
    )
  };
  
  export default UpdatePhysician;