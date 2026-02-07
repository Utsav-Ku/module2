import { useSelector, useDispatch } from "react-redux";
import { addAppointment } from "../redux/appointmentSlice";
import { useParams } from "react-router-dom";
import { useState } from "react";

function BookAppointment(){
    const { doctorId } = useParams();
    const dispatch = useDispatch();
    const { user } = useSelector((state) => state.auth);

    const [form, setForm] = useState({
        date: "",
        startTime: "",
        endTime: ""
    })

    const handleSubmit = async(e) => {
        e.preventDefault();
        const result = await dispatch(addAppointment({
            ...form,
            doctorId,
            patientId: user.id
        }))

        // Redux Toolkit returns metadata with async thunk results.
        // requestStatus tells us if the API call was fulfilled or rejected
        if(result.meta.requestStatus === "fulfilled") {
            alert("✅ Appointment booked successfully!");
            setForm({ date: "", startTime: "", endTime: "" });
        } 
        else{
            alert(result.payload || "❌ This slot is already booked!");
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>Book Appointment</h2>

            <input type="date" onChange={(e) => setForm({...form, date: e.target.value })} required />
            <input type="time" onChange={(e) => setForm({...form, startTime: e.target.value })} required />
            <input type="time" onChange={(e) => setForm({...form, endTime: e.target.value })} required />

            <button type="submit">Confirm Booking</button>
        </form>
    )
}

export default BookAppointment;