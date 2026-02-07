import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios'

export const fetchDoctors = createAsyncThunk(
    'apt/fetchDoctors',
    async () => {
        const response = await axios.get('http://localhost:3000/doctors');
        console.log(response.data)
        return response.data;
    }
);

export const fetchAppointments = createAsyncThunk(
    'appointments/fetch',
    async () => {
        const response = await axios.get('http://localhost:3000/appointments');
        return response.data;
    }
)

export const addAppointment = createAsyncThunk(
    'appointments/bookAppointment',
    async (newAppt, {getState, rejectWithValue }) => {
        //Get all Appointments from redux state
        const appointments = getState().appointments.appointments;
        const hasConflict = appointments.some((appointment) => {  //.some() return a boolean value
            const sameDoctor = appointment.doctorId === newAppt.doctorId;
            const sameDate = appointment.date === newAppt.date;

            //Check if the time overlap
            const isOverlapping = 
            (newAppt.startTime >= appointment.startTime && newAppt.startTime < appointment.endTime) ||
            (newAppt.endTime > appointment.startTime && newAppt.endTime <= appointment.endTime) ||
            (newAppt.startTime <= appointment.startTime && newAppt.endTime >= appointment.endTime);

            return sameDate && sameDoctor && isOverlapping;
        })

        if(hasConflict){
            return rejectWithValue("Doctor is Already Booked for this time slot!")
        }

        const response = await axios.post('http://localhost:3000/appointments', {
            ...newAppt,
            status: "pending",
        });

        return response.data;
    }
)

const initialState = {
    doctors: [],
    appointments: [],
    loading: false,
    error: null
}

const appointmentSlice = createSlice({
    name: 'appointments',
    initialState,
    reducers: {
        //Synchronous Operations If needed
    },
    extraReducers: (builder) => {
        builder
        .addCase(fetchDoctors.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(fetchDoctors.fulfilled, (state, action) => {
            state.loading = false;
            state.error = null;
            state.doctors = action.payload; //Put the fetched data in the doctors
        })
        .addCase(fetchDoctors.rejected, (state) => {
            state.loading = false;
            state.error = "Failed to fetch Doctors";
        })
        .addCase(fetchAppointments.fulfilled, (state, action) => {
            state.loading = false;
            state.appointments = action.payload
        })
        .addCase(addAppointment.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(addAppointment.fulfilled, (state, action) => {
            state.loading = false;
            state.error = null;
            state.appointments.push(action.payload) //Put the fetched data in the doctors
        })
        .addCase(addAppointment.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        })
    }
})

export default appointmentSlice.reducer;