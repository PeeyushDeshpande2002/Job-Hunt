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
import Companies from './components/admin/Companies'
import CompanyCreate from './components/admin/CompanyCreate'
import CompanySetup from './components/admin/CompanySetup'
import AdminJobs from './components/admin/AdminJobs'
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
        <Route path="/admin/companies" element={<Companies/>}/>
        <Route path="/admin/companies/create" element={<CompanyCreate/>}/>
        <Route path='/admin/companies/:id' element = {<CompanySetup/>}/>
        <Route path="/admin/jobs" element={<AdminJobs/>}/>
        {/* <Route path="/" element={<z/>}/>
        <Route path="/*" element={<NotFound/>}/> */}
      </Routes>
    </>
  )
}

export default App
