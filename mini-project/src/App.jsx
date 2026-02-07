import './App.css'
import Doctors from './components/DoctorsPage';
import Login from './components/Login';
import BookAppointment from './components/BookAppointment';
import { Route, Routes } from 'react-router-dom';
import Register from './components/Register';
import Dashboard from './components/Dashboard';

function App() {

  return (
    <>
      <Routes>
        <Route path="/" element={<Doctors />} />
        <Route path="/login" element={<Login />} />
        <Route path='/register' element={<Register />}/>
        <Route path="/book/:doctorId" element={<BookAppointment />} />
        <Route path='/dashboard' element={<Dashboard />}/>
      </Routes>
    </>
  )
}

export default App
