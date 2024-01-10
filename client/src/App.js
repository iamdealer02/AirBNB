import React from "react";
import {BrowserRouter, Route, Routes} from 'react-router-dom'
import Homepage from "./views/Homepage";
import ListingDetailsPage from "./views/ListingDetailsPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path ="/" element={<Homepage/>} />
        <Route path="/listing/:listing_id" element={<ListingDetailsPage/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
