import Header from "./Header";

const FindAPharmacy = () => {
  const handleSubmit = (event) => { alert('it works!');
  event.preventDefault();}

  return (
    <>
        <Header />
  
        <main>
            <h1>Trouver une pharmacie :</h1>
            <form onSubmit={handleSubmit}>
              <div>
                <label htmlFor="name">Nom</label>
                <input type="text" name="name"/>
              </div>
              <div>
                <label htmlFor="address">Rue et voie</label>
                <input type="text" name="address"/>
              </div>
              <div>
                <label htmlFor="zipcode">Code Postal</label>
                <input type="text" name="zipcode"/>
              </div>
              <div>
                <label htmlFor="city">Ville</label>
                <input type="text" name="city"/>
             </div>
              <div>
                <label htmlFor="phone_number">Téléphone</label>
                <input type="text" name="phone_number"/>
              </div>
              <div>
                <label htmlFor="email">Email</label>
                <input type="text" name="email"/>
              </div>
  
              <button type="submit">Trouver la pharmacie</button>
            </form>
            </main>
          </>
  )
};

export default FindAPharmacy;