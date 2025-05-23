// Navbar.tsx
import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Navbar: React.FC = () => {
    const { user, logout } = useAuth();

    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light px-4">
            <div className="container-fluid">
                <Link to="/" className="navbar-brand">📌 Pinterest</Link>
                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarNav"
                    aria-controls="navbarNav"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon" />
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav me-auto">
                        <li className="nav-item">
                            <Link to="/" className="nav-link">Home</Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/pins" className="nav-link">Pins</Link>
                        </li>
                        <li className="nav-item">
                        <Link to="/uploads" className="nav-link">Uploads</Link>
                    </li>
                        {user && (
                            <>
                                <li className="nav-item">
                                    <Link to="/pins/create" className="nav-link">Create Pin</Link>
                                </li>
                                <li className="nav-item">
                                    <Link to="/uploads/create" className="nav-link">Create Upload</Link>
                                </li>
                            </>
                        )}

                    </ul>
                    <div className="d-flex align-items-center">
                        {user ? (
                            <>
                                <Link to="/profile" className="btn btn-outline-secondary me-3">
                                    Profile
                                </Link>
                                <span className="me-3 text-muted">Logged in as: {user.username}</span>

                                <button className="btn btn-outline-danger" onClick={logout}>
                                    Logout
                                </button>
                            </>
                        ) : (
                            <>
                                <Link to="/login" className="btn btn-outline-primary me-2">Login</Link>
                                <Link to="/register" className="btn btn-outline-secondary">Register</Link>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
