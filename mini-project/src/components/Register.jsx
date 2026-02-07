import { useDispatch } from "react-redux";
import { useState } from "react";
import { register } from "../redux/authSlice";
import { useNavigate } from "react-router-dom";

function Register(){
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        const result = await dispatch(register({name, emailId: email, password}));
        if(result.meta.requestStatus === 'fulfilled'){
            alert("Account created successfully")
            navigate("/");
        }
        else{
            alert(result.payload);
        }
    }

    return (
        <form onSubmit={handleSubmit}>
            <h2>Create an account</h2>
            <input type="text" onChange={(e) => setName(e.target.value)} required />
            <input type="email" onChange={(e) => setEmail(e.target.value)} required />
            <input type="password" onChange={(e) => setPassword(e.target.value)} required />
            <button type="submit">Register</button>

            <p style={{ marginTop: '10px' }} >
                Already have an account? <span style={{ color: 'blue', cursor: 'pointer' }} onClick={() => navigate("/login")} >login</span>
            </p>
        </form>
    )
}

export default Register;