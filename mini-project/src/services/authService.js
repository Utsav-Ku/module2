import axios from 'axios';

export const loginApi = async(email, password) => {
    const response = await axios.get(
        `http://localhost:3000/users?email=${email}&password=${password}`
    )

    return response.data;
};

export const registerApi = async(userData) => {
    const response = await axios.post("http://localhost:3000/users", userData);
    return response.data;
}