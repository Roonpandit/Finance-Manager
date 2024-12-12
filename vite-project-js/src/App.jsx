import { useState } from 'react'
import reactLogo from './assets/react.svg'
import { Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from './component/AuthContext';
import './App.css'
import Auth from './component/Auth'
import About from "./component/About"
import Contact from "./component/Contact"
import { Summary } from './component/Summary'
import { Navbar } from './component/Navbar'
import { Income } from './component/Income'
import { Expenses } from './component/Expenses'
import { Transaction } from './component/Transaction'

function ProtectedRoute({ children }) {
  const { isAuthenticated } = useAuth(); 
  return isAuthenticated ? children : <Navigate to="/" />;  
}

function App() {
  return (
    <>
    <Routes>
      <Route path="/" element={<Auth/>} />
      <Route path='/About' element= {<About/>} />
      <Route path='/Contact' element= {<Contact/>} />

      <Route path="/income" element={<ProtectedRoute><Income /></ProtectedRoute>} />
      <Route path="/expense" element={<ProtectedRoute><Expenses /></ProtectedRoute>} />
      <Route path="/transaction" element={<ProtectedRoute><Transaction /></ProtectedRoute>} />
      <Route path="/summary" element={<ProtectedRoute><Summary /></ProtectedRoute>} />
    </Routes>
    </>
  )
}
export default App