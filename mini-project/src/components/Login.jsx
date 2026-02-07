import { useDispatch } from "react-redux";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { login } from "../redux/authSlice";

function Login(){
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();

    const [username, setUserName] = useState("");
    const [password, setPassword] = useState("");

    const redirectTo = location.state?.from || '/';

    const handleSubmit = async(e) => {
        e.preventDefault();
        const result = await dispatch(login({email: username, password}));
        if(result.meta.requestStatus === 'fulfilled'){
            navigate(redirectTo);
        }
        else{
            alert("Invalid Credentials")
        }
    }

    return (
        <form onSubmit={handleSubmit}>
            <h3>Login</h3>
            <input type="email" placeholder="Email" onChange={(e) => setUserName(e.target.value)} required />
            <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} required />
            <button type="submit">Login</button>

            <p style={{ marginTop: '10px' }} >
                Don’t have an account? <span style={{ color: 'blue', cursor: 'pointer' }} onClick={() => navigate('/register')}>Create an acount</span>
            </p>
        </form>
    )

}

export default Login;