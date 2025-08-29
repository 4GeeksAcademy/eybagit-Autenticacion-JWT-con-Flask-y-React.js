import { createContext, useContext, useReducer } from "react";
import { reducer, initialState, actions as createActions } from "../store";

const StoreContext = createContext();

export function StoreProvider({ children }) {
    const [state, dispatch] = useReducer(reducer, initialState);
    const acts = createActions(dispatch);

    return (
        <StoreContext.Provider value={{ state, ...acts }}>
            {children}
        </StoreContext.Provider>
    );
}

export default function useGlobalReducer() {
    return useContext(StoreContext);
}
