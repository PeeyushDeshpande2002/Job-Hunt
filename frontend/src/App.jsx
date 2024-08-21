import './App.css'
import Navbar from './components/shared/Navbar'
import {  Route, Routes } from 'react-router-dom'
import Home from './components/Home'
import Login from './components/auth/Login'
import Signup from './components/auth/Signup'
import { BrowserRouter as Router } from 'react-router-dom';
import Jobs from './components/Jobs'
import Browse from './components/Browse'
import Profile from './components/Profile'
import JobDescription from './components/JobDescription'

function App() {

  return (
    <>
      <Navbar/> 
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/signup" element={<Signup/>}/>
        <Route path="/jobs" element={<Jobs/>}/>
        <Route path="/profile" element={<Profile/>}/>
        <Route path="/browse" element={<Browse/>}/>
        <Route path="/description/:id" element={<JobDescription/>}/>
        {/* <Route path="/" element={<z/>}/>
        <Route path="/*" element={<NotFound/>}/> */}
      </Routes>
    </>
  )
}

export default App
