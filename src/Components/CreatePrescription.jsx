import Footer from "./Footer";
import Header from "./Header";


const CreatePrescription = ()=>{
  const handleSubmit=(event)=>{alert('ordonnance créée');
    event.preventDefault();

    const medicine_name = event.target.medicine_name.value;
    const dosage = event.target.dosage.value;
    const frequency = event.target.frequency.value;
    const duration = event.target.duration.value;
    const PatientId = event.target.PatientId.value;
    const PhysicianId = event.target.PhysicianId.value;
    const PharmacyId = event.target.PharmacyId.value;
    fetch("http://localhost:3001/api/prescriptions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        medicine_name: medicine_name,
        dosage: dosage,
        frequency: frequency,
        duration: duration,
        PhysicianId: PhysicianId,
        PatientId : PatientId,
        PharmacyId: PharmacyId
      })
    })
    .then((response) => {
      if (response.status === 200) {
        console.log("ordonnance créée");
      } else {
        console.log("erreur");
      }
    });
  };

  
  return (
    <div>
    <Header/>
    <main>
      <h1>Créer une ordonnance</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="medicine_name">Medicament</label>
          <input type="text" name="medicine_name"/>
        </div>
        <div>
          <label htmlFor="dosage">Dosage</label>
          <input type="text" name="dosage"/>
        </div>
        <div>
          <label htmlFor="frequency">Fréquence</label>
          <input type="text" name="frequency"/>
        </div>
        <div>
          <label htmlFor="duration">Durée</label>
          <input type="text" name="duration"/>
        </div>
        <div>
          <label htmlFor="PhysicianId">Pour le médecin:</label>
          <input type="number" name="PhysicianId"/>
        </div>
        <div>
          <label htmlFor="PatientId">Pour le patient:</label>
          <input type="number" name="PatientId"/>
        </div>
        <div>
          <label htmlFor="PharmacyId">Pour la pharmacie:</label>
          <input type="number" name="PharmacyId"/>
        </div>
        <button type="number">submit</button>
      </form>
    </main>
    <Footer/>
    </div>
  )
}

export default CreatePrescription;