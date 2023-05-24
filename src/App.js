import {BrowserRouter,Route,Routes} from "react-router-dom";

import Home from "./Components/Home"
import Physician from "./Components/Physician"
import Pharmacy from "./Components/Pharmacy"
import Patient from "./Components/Patient"
import AboutUs from "./Components/AboutUs";
import Assistance from "./Components/Assistance";
import MobileApp from "./Components/MobileApp";
import Delivery from "./Components/Delivery";
import Fees from "./Components/Fees";

import DisplayPhysicians from "./Components/DisplayPhysicians";
import DisplayPharmacies from "./Components/DisplayPharmacies";
import DisplayPatients from "./Components/DisplayPatients";
import DisplayPrescriptions from "./Components/DisplayPrescriptions";

import CreatePrescription from "./Components/CreatePrescription";
import UpdatePrescription from "./Components/UpdatePrescription";
import PrescriptionDetail from "./Components/PrescriptionDetail"

import CreatePatient from "./Components/CreatePatient";
import UpdatePatient from "./Components/UpdatePatient";
import PatientDetail from "./Components/PatientDetail";







function App() {
  return (
    <div>
        <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/physician" element={<Physician />} />
                    <Route path="/pharmacy" element={<Pharmacy />} />
                    <Route path="/patient" element={<Patient />}/>
                    <Route path="/about-us" element={<AboutUs />}/>
                    <Route path="/assistance" element={<Assistance />}/>
                    <Route path="/mobile" element={<MobileApp />}/>
                    <Route path="/delivery" element={<Delivery/>}/>
                    <Route path="/fees" element={<Fees/>}/>

                    <Route path="/physicianslist" element={<DisplayPhysicians />} />
                    <Route path="/pharmacieslist" element={<DisplayPharmacies />} />
                    <Route path="/patientslist" element={<DisplayPatients />} />
                    <Route path="/prescriptionslist" element={<DisplayPrescriptions />} />

                    <Route path="/create-prescription" element={<CreatePrescription />}/>
                    <Route path="/prescription/:id/update" element={<UpdatePrescription />} />
                    <Route path="/prescription/:id" element={<PrescriptionDetail />} />

                    <Route path="/create-patient" element={<CreatePatient />}/>
                    <Route path="/patient/:id/update" element={<UpdatePatient />} />
                    <Route path="/patient/:id" element={<PatientDetail />} />
                </Routes>
        </BrowserRouter>
    </div>
  );
}

export default App;