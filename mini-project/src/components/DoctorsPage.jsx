import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { fetchDoctors } from "../redux/appointmentSlice";

function Doctors(){
    const dispatch = useDispatch();

    //Get doctors, loading and error state from Redux
    const { doctors, loading, error } = useSelector((state) => state.appointments);

    useEffect(() => {
        dispatch(fetchDoctors());
    }, [dispatch])

    if(loading) return <p>Loading Doctors.....</p>
    if(error) return <p style={{ color: 'red' }}>{error}</p>

    return (
        <div>
            <h3>Available Doctor</h3>
            {doctors.map((doctor) => (
                <div>
                    <h3>{doctor.name}</h3>
                    <p>{doctor.specialty}</p>
                    <button>Book Appointment</button>
                </div>
            ))}
        </div>
    )
}

export default Doctors;