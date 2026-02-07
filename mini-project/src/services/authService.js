import axios from 'axios';

export const loginApi = async(email, password) => {
    const response = await axios.get(
        `http://localhost:3000/users?email=${email}&password=${password}`
    )

    return response.data;
};
