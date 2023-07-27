import React, { useState } from "react";
import Header from "../../Layout/Header/Header";
import Footer from "../../Layout/Footer/Footer";

const FindAPharmacy = () => {
  const [pharmacies, setPharmacies] = useState([]);
  const [searchPharmacy, setSearchPharmacy] = useState("");
  const [showPharmacyInfo, setShowPharmacyInfo] = useState(false);
  const [noPharmacyFound, setNoPharmacyFound] = useState(false);

  const handleSearch = (e) => {
    e.preventDefault();

    fetch(`http://localhost:3001/api/pharmacies?search=${searchPharmacy}`, {
      headers: { "Content-Type": "application/json" }
    })
      .then((response) => response.json())
      .then((data) => {
        if (data && data.data && data.data.length > 0) {
          setPharmacies(data.data);
          setShowPharmacyInfo(true);
          setNoPharmacyFound(false);
        } else {
          setPharmacies([]);
          setShowPharmacyInfo(false);
          setNoPharmacyFound(true);
        }
      })
      .catch((error) => {
        console.error("Error fetching pharmacies:", error);
        setPharmacies([]);
        setShowPharmacyInfo(false);
        setNoPharmacyFound(true);
      });
  };

  return (
    <>
      <Header />
      <main className="searchPharmacy">
        <h1>Trouver une Pharmacie</h1>
        <h2>par nom ou ville</h2>
        <form onSubmit={handleSearch}>
          <input
            type="text"
            value={searchPharmacy}
            onChange={(e) => setSearchPharmacy(e.target.value)}
            placeholder="Chercher Pharmacie"
          />
          <br />
          <button className="btn-2" type="submit">
            Search
          </button>
        </form>
        {showPharmacyInfo ? (
          pharmacies.length > 0 ? (
            pharmacies.map((pharmacy) => (
              <div key={pharmacy?.id}>
                <h2>Pharmacie {pharmacy?.name}</h2>
                <p>{pharmacy?.address}</p>
                <p>{pharmacy?.zipcode}</p>
                <p>{pharmacy?.city}</p>
              </div>
            ))
          ) : (
            <p>Pas de pharmacie trouvée</p>
          )
        ) : (
          noPharmacyFound && <p>Pas de pharmacie trouvée</p>
        )}
      </main>
      <Footer />
    </>
  );
};

export default FindAPharmacy;
