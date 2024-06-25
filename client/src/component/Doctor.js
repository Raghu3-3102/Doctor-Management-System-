import React from 'react'
import { useNavigate } from 'react-router-dom';

function Doctor({doctor}) {
  const navigate = useNavigate()
  return (
    <div className='card m-5' onClick={()=>navigate(`/book-appointment/${doctor._id}`)}>
        <h1 className='normal-text' p-10>Name:  {doctor.firstName} {doctor.lastName}</h1>
        <p className='normal-text'> Phone no. :{doctor.phoneNumber}</p>
        <hr />
        <p className='normal-text'>culsentent fee : {doctor.feePerCunseltation}</p>
        <p className='normal-text'>Expirence : {doctor.expirence}</p>
        <p className='normal-text'>Spcilization : {doctor.specialization}</p>
        <p className='normal-text'>Timing : {doctor.timing[0]} - {doctor.timing[1]}</p>
        <p className='normal-text'>Address : {doctor.address}</p>
        <p className='normal-text'>WEBSITE : : {doctor.website}</p>

          
    </div>
  )
}

export default Doctor;
