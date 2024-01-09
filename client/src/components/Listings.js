import React, { useState, useEffect } from 'react';
import axios from 'axios';

export const Listings = () => {

    const [list, setlist] = useState([])

    // get list from the database
    async function getListings() {
        var listings = await axios.get('http://localhost:8080/')
        console.log(listings)
        setlist(listings.data.listings)
    }
    useEffect(() => {
        getListings()
    }, [])

    return (
        <div className='row'>
        {list.map((item) => (
            <div className='col-md-3 mb-4'>
                <div className='HomepageListing d-flex flex-column' key={item._id} >
                    {item.thumbnail_url ? 
                    <img className='HomePageLisingImg' src={item.picture_url.url} alt={`Thumbnail for ${item.name}`} />:
                    <img className='HomePageLisingImg' src={item.thumbnail_url} alt={`Thumbnail for ${item.name}`} />
                    }
                
                {item.city}, {item.country} <br/>
                ${item.price}
            </div>
            </div>

        ))}
    </div>
    )
}