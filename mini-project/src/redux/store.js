import { configureStore } from '@reduxjs/toolkit'
import appointmentReducer from './appointmentSlice'

export const appStore = configureStore({
    reducer: {
        appointments: appointmentReducer
    }
})