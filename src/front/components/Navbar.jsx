import React from "react";
import { Link, useNavigate } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";

export const Navbar = () => {
    const { state, logout } = useGlobalReducer();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate("/login");
    };

    return (
        <nav className="navbar navbar-light bg-light mb-3 px-3">
            <Link to="/" className="navbar-brand mb-0 h1">
                JWT App
            </Link>
            <div className="ml-auto d-flex gap-2">
                {!state.token ? (
                    <>
                        <Link to="/login" className="btn btn-outline-primary">Login</Link>
                        <Link to="/signup" className="btn btn-primary">Signup</Link>
                    </>
                ) : (
                    <>
                        <Link to="/" className="btn btn-outline-success">Privado</Link>
                        <button className="btn btn-danger" onClick={handleLogout}>Logout</button>
                    </>
                )}
            </div>
        </nav>
    );
};
