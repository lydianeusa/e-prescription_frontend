import {BrowserRouter,Route,Routes} from "react-router-dom";

import Home from "./Components/Pages/Home/Home"
import Physician from "./Components/Pages/Physician/Physician"
import Pharmacy from "./Components/Pages/Pharmacy/Pharmacy"
import Patient from "./Components/Pages/Patient/Patient"
import AboutUs from "./Components/Pages/AboutUS/AboutUs";
import Assistance from "./Components/Pages/Assistance/Assistance";
import MobileApp from "./Components/Pages/MobileApp/MobileApp";
import Delivery from "./Components/Pages/Delivery/Delivery";
import Fees from "./Components/Pages/Fees/Fees";
import Login from "./Components/Pages/Login/Login";
import SignUp from "./Components/Pages/SignUp/SignUp";


import DisplayPhysicians from "./Components/Pages/DisplayPhysicians/DisplayPhysicians";
import DisplayPharmacies from "./Components/Pages/DisplayPharmacies/DisplayPharmacies";
import DisplayPatients from "./Components/Pages/DisplayPatients/DisplayPatients";
import DisplayPrescriptions from "./Components/Pages/DisplayPrescriptions/DisplayPrescriptions";

import CreatePrescription from "./Components/Pages/CreatePrescription/CreatePrescription";
import UpdatePrescription from "./Components/Pages/UpdatePrescription/UpdatePrescription";
import PrescriptionDetail from "./Components/Pages/PrescriptionDetail/PrescriptionDetail";

import CreatePatient from "./Components/Pages/CreatePatient/CreatePatient";
import UpdatePatient from "./Components/Pages/UpdatePatient/UpdatePatient";
import PatientDetail from "./Components/Pages/PatientDetail/PatientDetail";

import FindAPatient from "./Components/Pages/FindAPatient/FindAPatient";
import FindAPharmacy from "./Components/Pages/FindAPharmacy/FindAPharmacy";
import FindAPhysician from "./Components/Pages/FindAPhysician/FindAPhysician";


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
                    <Route path="/login" element={<Login/>}/>
                    <Route path="/sign-up" element={<SignUp/>}/>


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
                    <Route path="/find-patient" element={<FindAPatient />} />
                    <Route path="/find-pharmacy" element={<FindAPharmacy />} />
                    <Route path="/find-physician" element={<FindAPhysician />} />


                </Routes>
        </BrowserRouter>
    </div>
  );
}

export default App;