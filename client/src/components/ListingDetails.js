import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBed, faShower } from '@fortawesome/free-solid-svg-icons';

export const ListingDetails = () => {
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

  // Log the details whenever it changes
  useEffect(() => {
    console.log(details);
  }, [details]);

  useEffect(() => {
    getListingDetails(listing_id);
  }, [listing_id]);

  return (
    <div>
      <div className='container d-flex flex-column'>
        <h2 className='h2'> {details.name} </h2>
        <div className='ListingPictureSection mt-3'>
          {details.picture_url && details.picture_url.url && (
            <img src={details.picture_url.url} alt={`Thumbnail for ${details.name}`} />
          )}
          <div className='amenities-logo text-info d-flex flex-row '>
            <div className='mr-2'><FontAwesomeIcon  icon={faBed}/>{details.beds} </div>
            <div className='ml-2'><FontAwesomeIcon icon={faShower}/>  {details.bathrooms}</div>
            
          </div>

        </div>

        {details.summary}
        <div className='listingDetails d-flex flex-row'>
        <div className='hostDetails card'>
            <div className='card-header text-center h5'> Host Details</div>
            <div className='card-body'>
                <div className='d-flex flex-row '>
                <img className='rounded-circle hostImage' src={details.host_picture_url}/>
        
                <div className='d-flex flex-column'>
                <div className='mt-5 ml-5 h5'>  {details.host_name}</div>
                <div className='ml-5 '>{details.host_location} </div>
                <div className='ml-5 '>Since :  {details.host_since} </div>
                <div className='ml-5'> {details.host_about}</div>
                </div>

                </div>

            </div>
           

        </div>
        <div className='card'>
            <div className='card-header'>Amenities</div>
            <div className='card-body d-flex flex-cloumn'>
            {details.amenities && details.amenities.length > 0 ? (
    <ul>
                {details.amenities.map((amenity, index) => (
                    <li key={index}>
                        {amenity}
                       
                    
                    </li>
                ))}
                </ul>
            ) : (
                <p>No amenities available</p>
            )}
            </div>
        </div>

        </div>

        <div className='locationinmap'>

        </div>
      </div>
    </div>
  );
};
