import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import { loginApi } from "../services/authService";

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
    }
})

export const { logout } = authSlice.actions;
export default authSlice.reducer;