import { useSelector,useDispatch } from "react-redux";
import { cancelAppointment,confirmAppointment,fetchAppointmentsByDoctor } from "../redux/appointmentSlice";
import { useEffect } from "react";

export default function DoctorDashboard(){

    const dispatch = useDispatch();
    const { appointments, loading, error } = useSelector((state) => state.appointments);
    const { user } = useSelector((state) => state.auth)

    console.log(user.role);

    useEffect(() => {
        if(user?.id)
        dispatch(fetchAppointmentsByDoctor(user.id))
    }, [dispatch, user.id])

    if (!user) return <p>Please login as a doctor</p>;

    const isFutureAppointment = (date) => {
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const d = new Date(date);
        d.setHours(0, 0, 0, 0);
        return d > today;
    };

    if(loading) return <p>Loading....</p>
    if(error) return <p style={{ color: 'red' }}>{error}</p>

    return (
        <div>
            <h2>My Appointments</h2>
            <table border="1" cellPadding="10">
                <thead>
                    <tr>
                        <th>Date</th>
                        <th>Time</th>
                        <th>Status</th>
                        <th>Actions</th>
                    </tr>
                </thead>

                <tbody>
                    {appointments.map((appointment) => {
                        const canAct = isFutureAppointment(appointment.date) && appointment.status === "Booked";

                        return(
                            <tr key={appointment.id}>
                                <td>{appointment.date}</td>
                                <td>{appointment.startTime} - {appointment.endTime}</td>
                                <td>{appointment.status}</td>
                                <td>
                                    <button disabled={!canAct} onClick={() => dispatch(confirmAppointment(appointment.id))}>
                                        Confirm
                                    </button>
                                    <button disabled={!canAct} onClick={() => dispatch(cancelAppointment(appointment.id))}>
                                        Cancel
                                    </button>
                                </td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </div>
    )
}