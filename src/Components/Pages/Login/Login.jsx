import Header from "../../Layout/Header/Header";
import Footer from "../../Layout/Footer/Footer";
import { useNavigate } from "react-router-dom";
import "./Login.css"


const Login= () => {
  const navigate= useNavigate()

  const handleSubmit=(event)=>{
  event.preventDefault();

  const username = event.target.username.value;
  const password = event.target.password.value;

  fetch("http://localhost:3001/api/users/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      username: username,
      password: password,
    })
  })
  .then((response) => response.json()) // Je transforme la réponse en JSON
  .then((data) => { // Je récupère les données de la réponse
      
      if (data.token) { // Si j'ai un token dans la réponse
          const jwt = data.token; // Je récupère le token
          const roles = data.user.roles;
          localStorage.setItem("jwt", jwt); // Je stocke le token dans le localStorage
          localStorage.setItem("roles", JSON.stringify (roles));
          // console.log(roles)
          if (roles.includes("patient")) {
            const patientId = data.user.Patients[0].id; // Access the patient ID from the Patients array
            localStorage.setItem("patientId", patientId);
            console.log("patientId:", patientId);
        }
          navigate ("/")
      } 
    else {
      console.log("erreur");
    }
  });
};



  return (
    <div>
    <Header/>
    <main className="login">
      <h1>Connexion:</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="username">Utilisateur</label>
          <br />
          <input type="text" name="username"/>
        </div>
        <div>
          <label htmlFor="password">Mot de passe</label>
          <br />
          <input type="password" name="password"/>
        </div>
        <button className="btn-2" type="submit">Envoyer</button>
      </form>
    </main>
    <Footer/>
    </div>

  )
};

export default Login;