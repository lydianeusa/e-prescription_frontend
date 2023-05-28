import Header from "./Header";
import Footer from "./Footer";


const SignUp= () => {
  const handleSubmit=(event)=>{alert('inscrit!')
  event.preventDefault();

  const username = event.target.username.value;
  const password = event.target.password.value;

  fetch("http://localhost:3001/api/users/signup", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      username: username,
      password: password,
    })
  })
  .then((response) => {
    if (response.status === 200) {
      console.log("logged in");
    } else {
      console.log("erreur");
    }
  });
};



  return (
    <div>
    <Header/>
    <main className="signUp">
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
          <input type="text" name="password"/>
        </div>
        <button className="btn-2" type="submit">submit</button>
      </form>
    </main>
    <Footer/>
    </div>

  )
};

export default SignUp;