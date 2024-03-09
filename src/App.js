import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css';

import Appointment from './screens/appointment/appointment'
import HomePage from "./screens/homePage/homePage";
import AppointmentConfirmation from "./components/appointmentConfirmation/appointmentConfirmation";
import AdminDashboard from "./screens/adminDashboard/adminDashboard";



function App() {

  return (
    <BrowserRouter>
      <Routes>
          <Route index element={<HomePage/>}/>
          <Route path="appointment" element={<Appointment/>}/>
          <Route path="appointmentConfirmation/" element = {<AppointmentConfirmation/>}/>
          <Route path="dashboard" element={<AdminDashboard/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
