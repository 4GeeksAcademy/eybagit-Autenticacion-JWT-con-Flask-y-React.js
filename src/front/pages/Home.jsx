import React, { useEffect } from "react";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";
import { useNavigate } from "react-router-dom";

const Home = () => {
    const { state, getPrivate } = useGlobalReducer();
    const navigate = useNavigate();

    useEffect(() => {
        if (!state.token) {
            navigate("/login");
            return;
        }
        getPrivate(state.token);
    }, [state.token]);

    return (
        <div className="text-center mt-5">
            <h1>Área Privada</h1>
            <p className="mt-3">{state.message || "Cargando..."}</p>
            
        </div>
    );
};

export default Home;
