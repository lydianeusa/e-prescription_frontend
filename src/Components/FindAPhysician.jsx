import Header from "./Header";

const FindAPhysician = () => {
    const handleSubmit = (event) => { alert('it works!');
    event.preventDefault();}

    return (
        <>
            <Header />
            <main>
                <h1>Trouver un médecin :</h1>
                <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="first_name">Prénom</label>
                    <input type="text" name="first_name"/>
                </div>
                <div>
                    <label htmlFor="last_name">Nom</label>
                    <input type="text" name="last_name"/>
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
    
                <input type="submit" value="Trouver le médecin" />
                </form>
                </main>
        </>
    )
}

export default FindAPhysician;