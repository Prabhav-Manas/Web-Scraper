import './App.css'
import Register from "./pages/Register"
import LogIn from "./pages/LogIn"
import Home from "./pages/Home"
import { Routes, Route, Navigate } from "react-router-dom"

function App() {
  return(
    <div className="container">
      <div className="row">
        <Routes>
          <Route path="/" element={<Navigate to="/login"/>}/>
          <Route path="/login" element={<LogIn />} />
          <Route path="/register" element={<Register />} />
          <Route path="/home" element={<Home />} />
        </Routes>
      </div>
    </div>
  )
}

export default App