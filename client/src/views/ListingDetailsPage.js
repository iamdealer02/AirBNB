import React from 'react'
import {ListingDetails} from '../components/ListingDetails'
import { Navbar } from '../components/Navbar'
import '../static/Listing.css'

const ListingDetailsPage = () => {
  return (
    <div>
        <Navbar/>
       <ListingDetails/>
    </div>
    
  )
}

export default ListingDetailsPage;