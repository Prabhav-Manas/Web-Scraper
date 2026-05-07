import { Link, useNavigate } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';

const Navbar = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login', { replace: true });
    };

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark px-4">
            <Link className="navbar-brand fw-bold text-warning" to="/">
                HackerNews
            </Link>

            <button 
                className="navbar-toggler"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#navbarNav"
            >
                <span className="navbar-toggler-icon"></span>
            </button>

            <div className="collapse navbar-collapse" id="navbarNav">
                <ul className="navbar-nav ms-auto align-items-center gap-2">
                    <li className="nav-item">
                        <Link className="nav-link" to="/">
                            Stories
                        </Link>
                    </li>

                    {user ? (
                        <>
                            <li className="nav-item">
                                <Link className="nav-link" to="/bookmarks">
                                    🔖 Bookmarks
                                </Link>
                            </li>

                            <li className="nav-item">
                                <span className="nav-link text-warning">
                                    👤 {user.userName}
                                </span>
                            </li>

                            <li className="nav-item">
                                <button
                                    className="btn btn-outline-warning btn-sm"
                                    onClick={handleLogout}
                                >
                                    Logout
                                </button>
                            </li>
                        </>
                    ) : (
                        <>
                            <li className="nav-item">
                                <Link className="btn btn-outline-light btn-sm" to="/login">
                                    Login
                                </Link>
                            </li>

                            <li className="nav-item">
                                <Link className="btn btn-warning btn-sm" to="/register">
                                    Register
                                </Link>
                            </li>
                        </>
                    )}
                </ul>
            </div>
        </nav>
    );
};

export default Navbar;