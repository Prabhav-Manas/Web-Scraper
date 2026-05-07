import './App.css'
import Register from "./pages/Register"
import LogIn from "./pages/LogIn"
import VerifyEmail from "./pages/VerifyEmail"
import Home from "./pages/Home"
import Bookmarks from "./pages/Bookmarks"
import { Routes, Route, useLocation } from "react-router-dom"
import ProtectedRoute from "./components/common/ProtectedRoute"
import PublicRoute from "./components/common/PublicRoute"
import Navbar from "./components/common/Navbar"

function App() {
    const location = useLocation();

    const hideNavbarOn = ['/login', '/register'];
    const showNavbar = !hideNavbarOn.includes(location.pathname);

    return (
        <div>
            {showNavbar && <Navbar />}
            <div className="container">
                <div className="row">
                    <Routes>
                        {/* Public routes — redirect to home if already logged in */}
                        <Route path="/login" element={<PublicRoute><LogIn /></PublicRoute>}/>
                        <Route path="/register" element={<PublicRoute><Register /></PublicRoute>}/>

                        {/* Open routes — accessible by anyone */}
                        <Route path="/" element={<Home />} />
                        <Route path="/verify-email" element={<VerifyEmail />} />

                        {/* Protected routes — redirect to login if not logged in */}
                        <Route path="/bookmarks" element={<ProtectedRoute><Bookmarks /></ProtectedRoute>}/>
                    </Routes>
                </div>
            </div>
        </div>
    );
}

export default App;