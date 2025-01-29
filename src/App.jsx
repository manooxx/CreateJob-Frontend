import { BrowserRouter, Route, Routes } from "react-router-dom"
import Home from "./pages/Home"
import Navbar from "./components/Navbar"
import VerifyEmail from "./pages/VerifyEmail"
import Auth from "./pages/Auth"
import CompanyDashboard from "./pages/CompanyDashboard"
import CreateJobForm from "./components/CreateJobFrom"


function App() {


  return (
    <>
    <BrowserRouter>
    <Navbar/>

    <Routes>
    <Route path="/" element={<Home />}/>
    <Route path="/login" element={<Auth />}/>
    <Route path="/verify-email/:token" element={<VerifyEmail />} />
        <Route path="/companyDashboard" element={<CompanyDashboard />} />
        <Route path="/createJob" element={<CreateJobForm/>} />


    </Routes>
    
    </BrowserRouter>
    </>
  )
}

export default App
