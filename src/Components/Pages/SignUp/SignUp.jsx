import Header from "../../Layout/Header/Header";
import Footer from "../../Layout/Footer/Footer";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./SignUp.css";

const SignUp = () => {
  const navigate = useNavigate();
  const [selectedRole, setSelectedRole] = useState("patient");

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(event);
  
    const formData = new FormData(event.target);
    const roles = selectedRole;
    const username = formData.get("username");
    const password = formData.get("password");
    const email = formData.get("email");

  
    let additionalFields = {};
  
    switch (selectedRole) {
      case "physician":
        additionalFields = {
          last_name: formData.get("last_name"),
          first_name: formData.get("first_name"),
          verification_number: formData.get("verification_number"),
          specialty: formData.get("specialty"),
          address: formData.get("address"),
          zipcode: formData.get("zipcode"),
          city: formData.get("city"),
          phone_number: formData.get("phone_number")
        };
        break;
      case "pharmacist":
        additionalFields = {
          verification_number: formData.get("verification_number"),
          name: formData.get("name"),
          address: formData.get("address"),
          zipcode: formData.get("zipcode"),
          city: formData.get("city"),
          phone_number: formData.get("phone_number")
        };
        break;
      case "patient":
        additionalFields = {
          last_name: formData.get("last_name"),
          first_name: formData.get("first_name"),
          birth_date: formData.get("birth_date"),
          address: formData.get("address"),
          zipcode: formData.get("zipcode"),
          city: formData.get("city"),
          phone_number: formData.get("phone_number")
        };
        break;
    }
  
    fetch("http://localhost:3001/api/users/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        roles: [roles],
        username: username,
        password: password,
        email: email,
        ...additionalFields,
      }),
    })
      .then((response) => {
        if (response.status === 200) {
          console.log("logged in");
          navigate("/");
        } else {
          console.log("erreur");
        }
      });
  };
  

  const renderRoleSpecificFields = (selectedRole) => {
    switch (selectedRole) {
      case "physician":
        return (
          <div>
            <label htmlFor="last_name">Nom</label>
            <input type="text" name="last_name" placeholder="Nom" />
            <br />
            <label htmlFor="first_name">Prénom</label>
            <input type="text" name="first_name" placeholder="Prénom" />
            <br />
            <label htmlFor="specialty">Spécialité</label>
            <input type="text" name="specialty" placeholder="Spécialité" />
             <br />
             <label htmlFor="address">Numéro et rue</label>
            <input type="text" name="address" placeholder="Numéro et rue" />
            <br />
            <label htmlFor="zipcode">Code postal</label>
            <input type="number" name="zipcode" placeholder="Code postal" />
            <br />
            <label htmlFor="city">Ville</label>
            <input type="text" name="city" placeholder="Ville" />
            <br />
            <label htmlFor="phone_number">Téléphone</label>
            <input type="text" name="phone_number" placeholder="Téléphone" />
            <br />
            <label htmlFor="verification_number">Numéro de licence</label>
            <input type="text" name="verification_number" placeholder="Numéro de licence"/>
          </div>
        );
      case "pharmacist":
        return (
          <div>
            <label htmlFor="name">Nom de la pharmacie</label>
            <input type="text" name="name" placeholder="Nom de la pharmacie"/>
            <br />
            <label htmlFor="address">Numéro et rue</label>
            <input type="text" name="address" placeholder="Numéro et rue" />
            <br />
            <label htmlFor="zipcode">Code postal</label>
            <input type="number" name="zipcode" placeholder="Code postal" />
            <br />
            <label htmlFor="city">Ville</label>
            <input type="text" name="city" placeholder="Ville" />
            <br />
            <label htmlFor="phone_number">Téléphone</label>
            <input type="text" name="phone_number" placeholder="Téléphone" />
            <br />
            <label htmlFor="verification_number">Numéro de licence</label>
            <input type="text" name="verification_number" placeholder="Numéro de licence"/>
          </div>
        );
      case "patient":
        return (
          <div>
            <label htmlFor="last_name">Nom</label>
            <input type="text" name="last_name" placeholder="Nom"/>
            <br />
            <label htmlFor="first_name">Prénom</label>
            <input type="text" name="first_name" placeholder="Prénom" />
            <br />
            <label htmlFor="address">Numéro et rue</label>
            <input type="text" name="address" placeholder="Numéro et rue" />
            <br />
            <label htmlFor="zipcode">Code postal</label>
            <input type="number" name="zipcode" placeholder="Code postal" />
            <br />
            <label htmlFor="city">Ville</label>
            <input type="text" name="city" placeholder="Ville" />
            <br />
            <label htmlFor="phone_number">Téléphone</label>
            <input type="text" name="phone_number" placeholder="Téléphone" />
            <br />
            <label htmlFor="birth_date">Date de naissance</label>
            <input type="date" name="birth_date" placeholder="Date de naissance"/>
          </div>
        );
    }
  };

  return (
    <div>
      <Header />
      <main className="signUp">
        <h1>Inscription:</h1>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="roles" className="role">Sélectionner votre profil</label>
            <select
              name="roles"
              value={selectedRole}
              onChange={(event) => setSelectedRole(event.target.value)}
            >
              <option value="physician">Médecin</option>
              <option value="patient">Patient</option>
              <option value="pharmacist">Pharmacien</option>
            </select>
          </div>
          <div>
            <label htmlFor="username">Utilisateur</label>
            <input type="text" name="username" placeholder="Nom d'utilisateur"/>
          </div>
          <div>
            <label htmlFor="password">Mot de passe</label>
            <input type="password" name="password" placeholder="Mot de passe"/>
          </div>
          <div>
            <label htmlFor="email">Adresse mail</label>
            <input type="email" name="email" placeholder="Adresse mail"/>
          </div>

          {renderRoleSpecificFields(selectedRole)}

          <button className="btn-2" type="submit">
            Envoyer
          </button>
        </form>
      </main>
      <Footer />
    </div>
  );
};

export default SignUp;
