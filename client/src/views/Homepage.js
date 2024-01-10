import React from 'react'
import { Navbar } from '../components/Navbar'
import '../static/homepage.css'
import { Listings } from '../components/Listings'


function Homepage() {
  return (
    
    <div className='card'>
      <Navbar/>
    <div className='card-body'>
      <Listings />
    </div>
    </div>
    
  )
}

export default Homepage