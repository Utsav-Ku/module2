import { useDispatch, useSelector } from "react-redux";
import { cancelAppointment, fetchAppointments } from "../redux/appointmentSlice";
import { useEffect } from "react";


export default function PatientDashbaord(){

    const dispatch = useDispatch();
    const { appointments, loading, error } = useSelector((state) => state.appointments);
    const { user } = useSelector((state) => state.auth)

    useEffect(() => {
        dispatch(fetchAppointments());
    }, [dispatch])

    const isFutureAppointment = (date) => {
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        const appointmentDate = new Date(date);
        appointmentDate.setHours(0, 0, 0, 0);

        return appointmentDate > today;
    }

    const myAppointments = appointments.filter(appointment => appointment.patientId === user.id);

    if(loading) return <p>Loading....</p>
    if(error) return <p style={{ color: 'red' }}>{error}</p>

    return(
        <div>
            <h2>My Appointments</h2>
            { myAppointments.length === 0 ? (<p>No appointments found.</p>) : (
                <table border="1" cellPadding="10" width="100%">
                    <thead>
                        <tr>
                            <th>Date</th>
                            <th>Time</th>
                            <th>Doctor</th>
                            <th>Status</th>
                            <th>Action</th>
                        </tr>
                    </thead>

                    <tbody>
                        {myAppointments.map((appointment) => {
                            const canCancel = isFutureAppointment(appointment.date) && appointment.status === "Booked";
                            console.log(appointment.id)
                            return(
                                <tr key={appointment.id}>
                                    <td>{appointment.date}</td>
                                    <td>{appointment.startTime} - {appointment.endTime}</td>
                                    <td>{appointment.doctorId}</td>
                                    <td>{appointment.status}</td>
                                    <td>
                                        <button 
                                            disabled={!canCancel}
                                            onClick={() => dispatch(cancelAppointment(appointment.Id))}
                                            style={{ opacity: canCancel ? 1 : 0.5, cursor: canCancel ? "pointer" : "not-allowed" }}
                                        >
                                            Cancel
                                        </button>
                                    </td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            )}
        </div>
    )
}