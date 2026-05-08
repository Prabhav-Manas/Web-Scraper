import './App.css'
import { lazy, Suspense } from 'react'
import { Routes, Route, useLocation } from "react-router-dom"
import ProtectedRoute from "./components/common/ProtectedRoute"
import PublicRoute from "./components/common/PublicRoute"
import Navbar from "./components/common/Navbar"
import Loader from "./components/common/Loader"

// Lazy load all pages
const Register = lazy(() => import('./pages/Register'));
const LogIn = lazy(() => import('./pages/LogIn'));
const VerifyEmail = lazy(() => import('./pages/VerifyEmail'));
const Home = lazy(() => import('./pages/Home'));
const Bookmarks = lazy(() => import('./pages/Bookmarks'));

function App() {
    const location = useLocation();

    const hideNavbarOn = ['/login', '/register'];
    const showNavbar = !hideNavbarOn.includes(location.pathname);

    return (
        <div>
            {showNavbar && <Navbar />}
            <div className="container">
                <div className="row">
                    {/* Suspense shows Loader while page is loading */}
                    <Suspense fallback={<Loader message="Loading..." />}>
                        <Routes>
                            {/* Public routes */}
                            <Route path="/login" element={<PublicRoute><LogIn /></PublicRoute>}/>
                            <Route path="/register" element={<PublicRoute><Register /></PublicRoute>}/>

                            {/* Open routes for everyone */}
                            <Route path="/" element={<Home />} />
                            <Route path="/verify-email" element={<VerifyEmail />} />

                            {/* Protected routes */}
                            <Route path="/bookmarks" element={<ProtectedRoute><Bookmarks /></ProtectedRoute>}/>
                        </Routes>
                    </Suspense>
                </div>
            </div>
        </div>
    );
}

export default App;