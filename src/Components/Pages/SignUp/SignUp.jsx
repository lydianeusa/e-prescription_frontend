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
  
    let additionalFields = {};
  
    const validationRules = {
      email: {
        email: "Veuillez fournir une adresse email valide.",
      },
      username: {
        required: "Veuillez fournir un nom d'utilisateur.",
      },
      password: {
        required: "Veuillez fournir un mot de passe.",
        minLength: {
          value: 3,
          message: "Le mot de passe doit comporter au moins 3 caractères.",
        },
        pattern: {
          value: /^(?=.*[A-Z])(?=.*\W).{3,}$/,
          message: "Le mot de passe doit contenir au moins une majuscule et un caractère spécial.",
        },
      },
      first_name: {
        alpha: "Le prénom doit contenir uniquement des lettres.",
      },
      last_name: {
        alpha: "Le nom de famille doit contenir uniquement des lettres.",
      },
      phone_number: {
        length: {
          value: 10,
          message: "Le numéro de téléphone doit contenir 10 chiffres.",
        },
        numeric: "Le numéro de téléphone doit contenir des chiffres uniquement.",
      },
      zipcode: {
        length: {
          value: 5,
          message: "Le code postal doit contenir 5 chiffres.",
        },
        numeric: "Le code postal doit contenir des chiffres uniquement.",
      },
    };
  
    const errors = {};
  
    for (const fieldName in validationRules) {
      const fieldRules = validationRules[fieldName];
      const fieldValue = formData.get(fieldName);
  
      for (const rule in fieldRules) {
        if (rule === "required" && !fieldValue) {
          errors[fieldName] = fieldRules[rule];
        } else if (rule === "length" && fieldValue.length !== fieldRules[rule].value) {
          errors[fieldName] = fieldRules[rule].message;
        } else if (rule === "pattern" && !fieldRules[rule].value.test(fieldValue)) {
          errors[fieldName] = fieldRules[rule].message;
        }
      }
    }
  
    if (Object.keys(errors).length > 0) {
      console.log("Validation errors:", errors);
      return;
    }
  
    switch (selectedRole) {
      case "physician":
        additionalFields = {
          last_name: formData.get("last_name"),
          first_name: formData.get("first_name"),    
          email: formData.get("email"),
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
          name: formData.get("name"),
          email: formData.get("email"),
          address: formData.get("address"),
          zipcode: formData.get("zipcode"),
          city: formData.get("city"),
          phone_number: formData.get("phone_number"),
          verification_number: formData.get("verification_number"),
        };
        break;
      case "patient":
        additionalFields = {
          last_name: formData.get("last_name"),
          first_name: formData.get("first_name"),
          email: formData.get("email"),
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
            <input type="text" name="last_name" placeholder="Nom" pattern="[A-Za-zÀ-ÿ]+" title="Le nom doit contenir uniquement des lettres" />
            <br />
            <label htmlFor="first_name">Prénom</label>
            <input type="text" name="first_name" placeholder="Prénom" pattern="[A-Za-zÀ-ÿ]+" title="Le nom doit contenir uniquement des lettres" />
            <br />
            <label htmlFor="email">Adresse mail</label>
            <input type="email" name="email" placeholder="Adresse mail" pattern="[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}" title="Veuillez fournir une adresse email valide." />
            <br />
            <label htmlFor="specialty">Spécialité</label>
            <input type="text" name="specialty" placeholder="Spécialité" pattern="[A-Za-zÀ-ÿ]+" title="La spécialité doit contenir uniquement des lettres" />
            <br />
            <label htmlFor="address">Numéro et rue</label>
            <input type="text" name="address" placeholder="Numéro et rue" pattern="[A-Za-z0-9\s]+" />
            <br />
            <label htmlFor="zipcode">Code postal</label>
            <input type="number" name="zipcode" placeholder="Code postal" pattern="\d{5}" title="Le code postal doit contenir 5 chiffres" />
            <br />
            <label htmlFor="city">Ville</label>
            <input type="text" name="city" placeholder="Ville" pattern="[A-Za-zÀ-ÿ]+" title="La ville doit contenir uniquement des lettres" />
            <br />
            <label htmlFor="phone_number">Téléphone</label>
            <input type="text" name="phone_number" placeholder="Téléphone" pattern="\d{10}" title="Le numéro doit contenir 10 chiffres" />
            <br />
            <label htmlFor="verification_number">Numéro de licence</label>
            <input type="text" name="verification_number" placeholder="Numéro de licence" pattern="\d{5}" title="Le numéro doit contenir 5 chiffres" />
          </div>
        );
      case "pharmacist":
        return (
          <div>
            <label htmlFor="name">Nom de la pharmacie</label>
            <input type="text" name="name" placeholder="Nom de la pharmacie" pattern="[A-Za-zÀ-ÿ]+" title="Le nom doit contenir uniquement des lettres" />
            <br />
            <label htmlFor="email">Adresse mail</label>
            <input type="email" name="email" placeholder="Adresse mail" pattern="[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}" title="Veuillez fournir une adresse email valide." />
            <br />
            <label htmlFor="address">Numéro et rue</label>
            <input type="text" name="address" placeholder="Numéro et rue" pattern="[A-Za-z0-9\s]+" />
            <br />
            <label htmlFor="zipcode">Code postal</label>
            <input type="number" name="zipcode" placeholder="Code postal" pattern="\d{5}" title="Le code postal doit contenir 5 chiffres" />
            <br />
            <label htmlFor="city">Ville</label>
            <input type="text" name="city" placeholder="Ville" pattern="[A-Za-zÀ-ÿ]+" title="Le nom doit contenir uniquement des lettres" />
            <br />
            <label htmlFor="phone_number">Téléphone</label>
            <input type="text" name="phone_number" placeholder="Téléphone" pattern="\d{10}" title="Le numéro doit contenir 10 chiffres" />
            <br />
            <label htmlFor="verification_number">Numéro de licence</label>
            <input type="text" name="verification_number" placeholder="Numéro de licence" pattern="\d{5}" title="Le numéro doit contenir 5 chiffres" />
          </div>
        );
      case "patient":
        return (
          <div>
            <label htmlFor="last_name">Nom</label>
            <input type="text" name="last_name" placeholder="Nom" pattern="[A-Za-zÀ-ÿ]+" title="Le nom doit contenir uniquement des lettres" />
            <br />
            <label htmlFor="first_name">Prénom</label>
            <input type="text" name="first_name" placeholder="Prénom" pattern="[A-Za-zÀ-ÿ]+" title="Le nom doit contenir uniquement des lettres" />
            <br />
            <label htmlFor="email">Adresse mail</label>
            <input type="email" name="email" placeholder="Adresse mail" pattern="[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}" title="Veuillez fournir une adresse email valide." />
            <br />
            <label htmlFor="address">Numéro et rue</label>
            <input type="text" name="address" placeholder="Numéro et rue" pattern="[A-Za-z0-9\s]+" />
            <br />
            <label htmlFor="zipcode">Code postal</label>
            <input type="number" name="zipcode" placeholder="Code postal" pattern="\d{5}" title="Le code postal doit contenir 5 chiffres" />
            <br />
            <label htmlFor="city">Ville</label>
            <input type="text" name="city" placeholder="Ville" pattern="[A-Za-zÀ-ÿ]+" title="Le nom doit contenir uniquement des lettres" />
            <br />
            <label htmlFor="phone_number">Téléphone</label>
            <input type="text" name="phone_number" placeholder="Téléphone" pattern="\d{10}" title="Le numéro doit contenir 10 chiffres" />
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
                    <label htmlFor="username">Utilisateur *</label>
                    <input type="text" name="username" placeholder="Nom d'utilisateur"/>
                  </div>
                  <div>
                    <label htmlFor="password">Mot de passe *</label>
                    <input type="password" name="password" placeholder="Mot de passe"/>
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
