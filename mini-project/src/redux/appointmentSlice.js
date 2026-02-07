import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios'

export const fetchDoctors = createAsyncThunk(
    'appointments/fetchDoctors',
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
            status: "Booked",
        });

        return response.data;
    }
)

export const fetchAppointmentsByDoctor = createAsyncThunk(
    'appointments/fetchAppointmentsByDoctor',
    async (doctorId, { rejectWithValue }) => {
        try{
            const res = await axios.get(`http://localhost:3000/appointments?doctorId=${doctorId}`);
            return res.data;
        }
        catch(err){
            return rejectWithValue(`Failed to fetch data${err}`)
        }
    }
)

export const confirmAppointment = createAsyncThunk(
    'appointments/confirmAppointment',
    async (appointmentId, {rejectWithValue}) => {
        try{
            const res = await axios.patch(
                `http://localhost:3000/appointments/${appointmentId}`,
                { status: "Confirmed" }
            )

            return  res.data;
        }
        catch(err){
            return rejectWithValue(`Failed to update status${err}`);
        }
    }
)

export const cancelAppointment = createAsyncThunk(
    'appointments/cancelAppointment',
    async (appointmentId, {rejectWithValue}) => {
        try{
            const res = await axios.patch(
                `http://localhost:3000/appointments/${appointmentId}`,
                { status: "Cancelled" }
            )

            return  res.data;
        }
        catch(err){
            return rejectWithValue(`Failed to update status${err}`);
        }
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
        //cancel appointment
        .addCase(cancelAppointment.pending, (state) => {
            state.loading = true
            state.error = null;
        }) 
        .addCase(cancelAppointment.fulfilled, (state, action) => {
            state.loading = false;
            state.error = null;

            const index = state.appointments.findIndex(
                (appointment) => appointment.id === action.payload.id
            );

            if(index !== -1){
                state.appointments[index] = action.payload
            }
        })
        .addCase(cancelAppointment.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        })
        // fetch by doctor
        .addCase(fetchAppointmentsByDoctor.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(fetchAppointmentsByDoctor.fulfilled, (state, action) => {
            state.loading = false;
            state.appointments = action.payload;
        })
        .addCase(fetchAppointmentsByDoctor.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        })
        // confirm
        .addCase(confirmAppointment.fulfilled, (state, action) => {
            const index = state.appointments.findIndex(a => a.id === action.payload.id);
            if (index !== -1) {
                state.appointments[index] = action.payload;
            }
        })
    }
})

export default appointmentSlice.reducer;