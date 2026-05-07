import './App.css'
import Register from "./pages/Register"
import LogIn from "./pages/LogIn"
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from "react-router-dom"

function App() {
  return(
    <div className="container">
      <div className="row">
        <Routes>
          <Route path="/" element={<Navigate to="/register"/>}/>
          <Route path="/login" element={<LogIn />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </div>
    </div>
  )
}

export default App