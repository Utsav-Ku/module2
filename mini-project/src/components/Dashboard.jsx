import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import PatientDashbaord from "./PatientDashboard";
import DoctorDashboard from "./DoctorDashboard";
import AdminDashboard from "./AdminDashboard";
function Dashboard(){
    const { isLoggedIn, user } = useSelector((state) => state.auth);

    console.log(user);

    if(!isLoggedIn){
        return <Navigate to="/login" />
    }
    if(user.role === "patient"){
        return <PatientDashbaord />
    }
    if(user.role === "doctor"){
        return <DoctorDashboard />
    }
    if(user.role === "admin"){
        return <AdminDashboard />
    }

    return <p>Invalid role: {user.role}</p>;
}

export default Dashboard;