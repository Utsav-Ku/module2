import './App.css'
import Doctors from './components/DoctorsPage';
import Login from './components/Login';
import BookAppointment from './components/BookAppointment';
import { Route, Routes } from 'react-router-dom';
import Register from './components/Register';

function App() {

  return (
    <>
      <Routes>
        <Route path="/" element={<Doctors />} />
        <Route path="/login" element={<Login />} />
        <Route path='/register' element={<Register />}/>
        <Route path="/book/:doctorId" element={<BookAppointment />} />
      </Routes>
    </>
  )
}

export default App
