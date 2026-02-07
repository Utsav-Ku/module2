import { configureStore } from '@reduxjs/toolkit'
import appointmentReducer from './appointmentSlice.js'
import  authReducer  from './authSlice.js'

export const appStore = configureStore({
    reducer: {
        appointments: appointmentReducer,
        auth: authReducer
    }
})