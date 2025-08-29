import backendURL from "./components/BackendURL.jsx";

export const initialState = {
    token: localStorage.getItem("token") || null,
    message: null,
    userId: null
};

export function reducer(state, action) {
    switch (action.type) {
        case "SET_TOKEN":
            return { ...state, token: action.payload };
        case "SET_MESSAGE":
            return { ...state, message: action.payload };
        case "SET_USER_ID":
            return { ...state, userId: action.payload };
        case "LOGOUT":
            localStorage.removeItem("token");
            return initialState;
        default:
            return state;
    }
}

export const actions = (dispatch) => ({
    signup: (email, password) => {
        return fetch(`${backendURL}/api/signup`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password })
        })
        .then(res => res.json().then(data => ({ ok: res.ok, data })))
        .then(({ ok, data }) => {
            dispatch({ type: "SET_MESSAGE", payload: data.msg || "" });
            return ok;
        })
        .catch(err => {
            console.error("Error en signup:", err);
            return false;
        });
    },

    login: (email, password) => {
        return fetch(`${backendURL}/api/login`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password })
        })
        .then(res => res.json())
        .then(data => {
            if (data.token) {
                localStorage.setItem("token", data.token);
                dispatch({ type: "SET_TOKEN", payload: data.token });
                dispatch({ type: "SET_MESSAGE", payload: "Login exitoso" });
                return true;
            }
            dispatch({ type: "SET_MESSAGE", payload: data.msg || "" });
            return false;
        })
        .catch(err => {
            console.error("Error en login:", err);
            return false;
        });
    },

    getPrivate: (token) => {
        return fetch(`${backendURL}/api/private`, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            }
        })
        .then(res => res.json())
        .then(data => {
            dispatch({ type: "SET_MESSAGE", payload: data.msg || "Sin mensaje" });
            dispatch({ type: "SET_USER_ID", payload: data.user_id || null });
        })
        .catch(err => {
            console.error("Error en ruta privada:", err);
        });
    },

    logout: () => dispatch({ type: "LOGOUT" })
});
