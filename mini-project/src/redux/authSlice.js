import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import { loginApi, registerApi } from "../services/authService";
import axios from "axios";

export const login = createAsyncThunk(
    'auth/login',
    async ({ email, password}, {rejectWithValue}) => {
        const user = await loginApi(email, password);
        if(!user){
            return rejectWithValue("Invalid Email or Password");
        }

        return user;
    }
)

export const register = createAsyncThunk(
    'auth/register',
    async ({name, emailId, password}, {rejectWithValue}) => {
        try{
            //Check if user already exist
            const checkRes = await axios.get(`http://localhost:3000/users?email=${emailId}`)

            if(checkRes.data.length > 0){
                return rejectWithValue("Email already exists. Please login instead.")
            }

            const newUser = {
                name,
                email: emailId,
                password,
                role: "patient"
            };

            const createdUser = await registerApi(newUser);
            return createdUser;
        } 
        catch(err){
            return rejectWithValue(`Registration failed${err.message}. Try again.`);
        }
    }
)

export const updateUserDetails = createAsyncThunk(
    "appointments/updatePatientDetails",
    async ({ id, data }, {rejectWithValue}) => {
        try{
            const res = await axios.patch(
                `http://localhost:3000/users/${id}`,
                data
            )

            return res.data
        }
        catch(err){
            rejectWithValue(`Failed to update profile${err}`);
        }
    }
)

const initialState = {
    isLoggedIn: localStorage.getItem("user") || false,
    user: JSON.parse(localStorage.getItem("user")) || null,
    error: null
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        //Reducer to logout the current user
        logout: (state) => {
            state.isLoggedIn = false;
            state.user = null;
            localStorage.removeItem(state.user);
        }
    },
    extraReducers: (builder) => {
        builder
        //Login
        .addCase(login.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(login.fulfilled, (state, action) => {
            state.isLoggedIn = true;
            state.user = action.payload;
            localStorage.setItem("user", JSON.stringify(action.payload));
        })
        .addCase(login.rejected, (state, action) => {
            state.isLoggedIn = false;
            state.user = null;
            state.error = action.payload;
        })
        //Register
        .addCase(register.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(register.fulfilled, (state, action) => {
            state.loading = false;
            state.isLoggedIn = true;          
            state.user = action.payload;    
            state.error = null;
            localStorage.setItem("user", JSON.stringify(action.payload)); 
        })
        .addCase(register.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        })
        //update details
        .addCase(updateUserDetails.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(updateUserDetails.fulfilled, (state, action) => {
            state.loading = false;
            state.user = action.payload;             
            localStorage.setItem("user", JSON.stringify(action.payload)); 
        })
        .addCase(updateUserDetails.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        }) 
    }
})

export const { logout } = authSlice.actions;
export default authSlice.reducer;