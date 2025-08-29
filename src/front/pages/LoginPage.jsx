import React, { useState, useEffect } from "react";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";
import { useNavigate, Link } from "react-router-dom";

const LoginPage = () => {
    const { state, login } = useGlobalReducer();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        if (state.token) navigate("/");
    }, [state.token, navigate]);

    const onSubmit = (submitEvent) => {
        submitEvent.preventDefault();
        setLoading(true);

        login(email, password)
            .then(ok => {
                setLoading(false);
                if (ok) {
                    alert("✅ Login exitoso");
                    navigate("/");
                } else {
                    alert("❌ Credenciales inválidas");
                }
            })
            .catch(err => {
                setLoading(false);
                console.error("Error en login:", err);
                alert("⚠️ Ocurrió un error al iniciar sesión");
            });
    };

    return (
        <div className="container mt-5 w-50" >
            <h1 className="text-center mb-4">Iniciar sesión</h1>
            <form onSubmit={onSubmit}>
                <input
                    className="form-control mb-3"
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={emailChangeEvent => setEmail(emailChangeEvent.target.value)}
                    required
                />
                <input
                    className="form-control mb-3"
                    type="password"
                    placeholder="Contraseña"
                    value={password}
                    onChange={passwordChangeEvent => setPassword(passwordChangeEvent.target.value)}
                    required
                />
                <button className="btn btn-primary w-50 d-block mx-auto" disabled={loading}>
                    {loading ? "Entrando..." : "Entrar"}
                </button>
            </form>
            <p className="text-center mt-3">
                ¿No tienes cuenta? <Link to="/signup">Regístrate</Link>
            </p>
        </div>
    );
};

export default LoginPage;
