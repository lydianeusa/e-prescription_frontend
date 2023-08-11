import {BrowserRouter,Route,Routes} from "react-router-dom";

import Home from "./Components/Pages/Home/Home"
import Admin from "./Components/Pages/Admin/Admin"
import AboutUs from "./Components/Pages/AboutUS/AboutUs";
import Assistance from "./Components/Pages/Assistance/Assistance";
import MobileApp from "./Components/Pages/MobileApp/MobileApp";
import Delivery from "./Components/Pages/Delivery/Delivery";
import Fees from "./Components/Pages/Fees/Fees";
import Login from "./Components/Pages/Login/Login";
import SignUp from "./Components/Pages/SignUp/SignUp";

import DisplayPrescriptions from "./Components/Pages/DisplayPrescriptions/DisplayPrescriptions";
import CreatePrescription from "./Components/Pages/CreatePrescription/CreatePrescription";
import UpdatePrescription from "./Components/Pages/UpdatePrescription/UpdatePrescription";
import PrescriptionDetail from "./Components/Pages/PrescriptionDetail/PrescriptionDetail";
import PrescriptionAdmin from "./Components/Pages/PrescriptionAdmin/PrescriptionAdmin";

import Patient from "./Components/Pages/Patient/Patient";
import CreatePatient from "./Components/Pages/CreatePatient/CreatePatient";
import UpdatePatient from "./Components/Pages/UpdatePatient/UpdatePatient";
import PatientDetail from "./Components/Pages/PatientDetail/PatientDetail";
import DisplayPatients from "./Components/Pages/DisplayPatients/DisplayPatients";
import FindAPatient from "./Components/Pages/FindAPatient/FindAPatient";

import Physician from "./Components/Pages/Physician/Physician";
import FindAPhysician from "./Components/Pages/FindAPhysician/FindAPhysician";
import PhysicianDetail from "./Components/Pages/PhysicianDetail/PhysicianDetail";
import CreatePhysician from "./Components/Pages/CreatePhysician/CreatePhysician";
import DisplayPhysicians from "./Components/Pages/DisplayPhysicians/DisplayPhysicians";
import UpdatePhysician from "./Components/Pages/UpdatePhysician/UpdatePhysician";

import Pharmacy from "./Components/Pages/Pharmacy/Pharmacy";
import CreatePharmacy from "./Components/Pages/CreatePharmacy/CreatePharmacy";
import UpdatePharmacy from "./Components/Pages/UpdatePharmacy/UpdatePharmacy";
import FindAPharmacy from "./Components/Pages/FindAPharmacy/FindAPharmacy";
import DisplayPharmacies from "./Components/Pages/DisplayPharmacies/DisplayPharmacies";


function App() {
  return (
    <div>
        <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/admin" element={<Admin />}/>
                    <Route path="/about-us" element={<AboutUs />}/>
                    <Route path="/assistance" element={<Assistance />}/>
                    <Route path="/mobile" element={<MobileApp />}/>
                    <Route path="/delivery" element={<Delivery/>}/>
                    <Route path="/fees" element={<Fees/>}/>
                    <Route path="/login" element={<Login/>}/>
                    <Route path="/sign-up" element={<SignUp/>}/>

                    <Route path="/prescriptionslist" element={<DisplayPrescriptions />} />
                    <Route path="/create-prescription" element={<CreatePrescription />}/>
                    <Route path="/prescription/:id/update" element={<UpdatePrescription />} />
                    <Route path="/prescription/:id" element={<PrescriptionDetail />} />
                    <Route path="/prescription-admin/:id" element={<PrescriptionAdmin />} />

                    <Route path="/patient" element={<Patient />}/>
                    <Route path="/create-patient" element={<CreatePatient />}/>
                    <Route path="/patient/:id/update" element={<UpdatePatient />} />
                    <Route path="/patient/:id" element={<PatientDetail />} />
                    <Route path="/find-patient" element={<FindAPatient />} />
                    <Route path="/patientslist" element={<DisplayPatients />} />

                    <Route path="/pharmacy" element={<Pharmacy />} />
                    <Route path="/find-pharmacy" element={<FindAPharmacy />} />
                    <Route path="/create-pharmacy" element={<CreatePharmacy />} />
                    <Route path="/pharmacy/:id/update" element={<UpdatePharmacy />} />
                    <Route path="/pharmacieslist" element={<DisplayPharmacies />} />

                    <Route path="/physician" element={<Physician />} />
                    <Route path="/find-physician" element={<FindAPhysician />} />
                    <Route path="/create-physician" element={<CreatePhysician />} />
                    <Route path="/physician/:id" element={<PhysicianDetail />} />
                    <Route path="/physician/:id/update" element={<UpdatePhysician />} />
                    <Route path="/physicianslist" element={<DisplayPhysicians />} />
                </Routes>
        </BrowserRouter>
    </div>
  );
}

export default App;