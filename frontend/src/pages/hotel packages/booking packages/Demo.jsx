import React from 'react'
import { Link } from 'react-router-dom'
import {
    Button
}from '@material-tailwind/react'

export default function Demo() {
  return (
    <div className='p-10'>
      <Link to='/packages'>
        <Button className='m-10'>Hotel Packages</Button>
      </Link>
      <Link to='/hotelbookingdisplay'>
        <Button className='m-10'>Hotel Packages Booking</Button>
      </Link>



      <Link to='/customcreated'>
        <Button className='m-10'>Custom Packages</Button>
      </Link>
      <Link to='/cusbokingdisplay'>
        <Button className='m-10'>Custom Packages Bookings</Button>
      </Link>


    </div>
  )
}
