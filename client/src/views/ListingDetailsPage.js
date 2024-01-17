import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import {ListingDetails} from '../components/ListingDetails'
import { Navbar } from '../components/Navbar'
import '../static/Listing.css'


const ListingDetailsPage = () => {
  const [details, setDetails] = useState({});
  const { listing_id } = useParams();

  // Fetch the data from the backend
  async function getListingDetails(listing_id) {
    try {
      const response = await axios.get(`http://localhost:8080/listings/${listing_id}`);
      setDetails(response.data.message[0]);
    } catch (error) {
      console.error('Error fetching listing details:', error);
    }
  }


  useEffect(() => {
    getListingDetails(listing_id);
  }, [listing_id]);

  return (
    <div>
        <Navbar/>
       <ListingDetails details={details}/>
     
       
  
    </div>
    
  )
}

export default ListingDetailsPage;