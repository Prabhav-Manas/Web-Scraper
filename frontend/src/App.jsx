import './App.css'
import Register from "./pages/Register"
import LogIn from "./pages/LogIn"
import VerifyEmail from "./pages/VerifyEmail"
import Home from "./pages/Home"
import Bookmarks from "./pages/Bookmarks"
import { Routes, Route, Navigate } from "react-router-dom"
import ProtectedRoute from "./components/common/ProtectedRoute"

function App() {
  return(
    <div className="container">
      <div className="row">
        <Routes>
          <Route path="/" element={<Home />}/>
          <Route path="/login" element={<LogIn />} />
          <Route path="/register" element={<Register />} />
          <Route path="/verify-email" element={<VerifyEmail />} />
          <Route path="/bookmarks" element={<ProtectedRoute><Bookmarks /></ProtectedRoute>} />
        </Routes>
      </div>
    </div>
  )
}

export default App