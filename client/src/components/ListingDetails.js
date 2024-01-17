import React from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBed, faShower } from '@fortawesome/free-solid-svg-icons';
import { Bookings } from '../components/Bookings';

export const ListingDetails = ({details}) => {

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

        
        <div className='listingDetails'>
            <div className='listingHostPolicies'>
                <div className='hostDetails '>
                <div >
                    <img className='hostImage' src={details.host_picture_url} />
                </div>
                <div className='hostName'>
                    Hosted By {details.host_name}
                </div>
                
                </div>
                <div className='listingPolicies'>
                    {  details.cancellation_policy ?
                    <div className='policy'>
                         <div className='policyIcon'><img src='https://cdn-icons-png.flaticon.com/128/13479/13479865.png' /> </div>
                         <div className='policySummary'>
                         <div className='policyName'>Cancellation Policy </div>
                        <div className='policyDescription'>{details.cancellation_policy}</div>
                        </div>

                    </div>  : null
}
                {details.house_rules ?
                    <div className='policy'>
                        <div className='policyIcon'><img src='https://cdn-icons-png.flaticon.com/128/11261/11261480.png' /> </div>
                        <div className='policySummary'>
                        <div className='policyName'>House Rules </div>
                        <div className='policyDescription'>{details.house_rules}</div>
                        </div>

                    </div>  : null
        }   
                </div>
            </div>


            
            <div>
        
        <Bookings details = {details}/>
        </div>
        </div>

        <div className='locationinmap'>

        </div>
        <div className='d-flex flex-row'>

        <div className='amenties'>
            <div className='amenities'>Amenities</div>
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
      </div>
    </div>
  );
};
