import React from "react";
import {BrowserRouter, Route, Routes} from 'react-router-dom'
import Homepage from "./views/Homepage";
import ListingDetailsPage from "./views/ListingDetailsPage";
import LoginPage from "./views/LoginPage";
import RegistrationPage from "./views/RegistrationPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path ="/" element={<Homepage/>} />
        <Route path="/listing/:listing_id" element={<ListingDetailsPage/>}/>
        <Route path="/login" element={<LoginPage/>} />
        <Route path= "/register" element ={<RegistrationPage/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
