import React, { useState, useEffect } from "react";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";
import { useNavigate, Link } from "react-router-dom";

const SignupPage = () => {
    const { state, signup } = useGlobalReducer();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();


    const onSubmit = (submitEvent) => {
        submitEvent.preventDefault();
        setLoading(true);

        signup(email, password)
            .then(ok => {
                setLoading(false);
                if (ok) {
                    alert("✅ Usuario registrado con éxito");
                    navigate("/login");
                } else {
                    alert("❌ Error en registro");
                }
            })
            .catch(err => {
                setLoading(false);
                console.error("Error en registro:", err);
                alert("⚠️ Ocurrió un error en el registro");
            });
    };

    return ( 
        <div className="container mt-5 w-50" >
            <h1 className="text-center mb-4">Registro</h1>
            <form onSubmit={onSubmit}>
                <input
                    className="form-control mb-3"
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(emailChangeEvent) => setEmail(emailChangeEvent.target.value)}
                    required
                />
                <input
                    className="form-control mb-3"
                    type="password"
                    placeholder="Contraseña"
                    value={password}
                    onChange={(passwordChangeEvent) => setPassword(passwordChangeEvent.target.value)}
                    required
                />
                    <button className="btn btn-success w-50 d-block mx-auto " disabled={loading}>
                        {loading ? "Registrando..." : "Registrarme"}
                    </button> 
            </form>
            <p className="text-center mt-3">
                ¿Ya tienes cuenta? <Link to="/login">Inicia sesión</Link>
            </p>
        </div>
    );
};

export default SignupPage;
