import { useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { fetchDoctors } from "../redux/appointmentSlice";
import { useNavigate } from 'react-router-dom';

function Doctors(){
    const dispatch = useDispatch();
    const navigate = useNavigate();

    //Get doctors, loading and error state from Redux
    const { doctors, loading, error } = useSelector((state) => state.appointments);
    const { isLoggedIn, user } = useSelector((state) => state.auth);

    useEffect(() => {
        dispatch(fetchDoctors());
    }, [dispatch])

    if(loading) return <p>Loading Doctors.....</p>
    if(error) return <p style={{ color: 'red' }}>{error}</p>

    const handleBook = (doctorId) => {
        if(!isLoggedIn){
            // Redirect to login and remember the page user wanted to visit
            navigate("/login", { state: { from: `/book/${doctorId}` } });
            return;
        }

        if(user.role != 'patient'){
            alert('Only patient can book appointments');
            return;
        }

        navigate(`/book/${doctorId}`);
    }

    return (
        <div>
            <h3>Available Doctor</h3>
            {doctors.map((doctor) => (
                <div>
                    <h3>{doctor.name}</h3>
                    <p>{doctor.specialty}</p>
                    <button onClick={() => handleBook(doctor.id)}>Book Appointment</button>
                </div>
            ))}
        </div>
    )
}

export default Doctors;