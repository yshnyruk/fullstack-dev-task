import { createContext, useContext, useState } from "react";

interface User {
    name: string;
}

interface StateContextType {
    user: User | null;
    token: string | null;
    setUser: (user: User | null) => void;
    setToken: (token: string | null) => void;
    notification: string;
    setNotification: (message: string) => void;
}

const StateContext = createContext<StateContextType>({
    user: null,
    token: null,
    setUser: () => { },
    setToken: () => { },
    notification: '',
    setNotification: () => { },
});

export const ContextProvider = ({ children }: { children: React.ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);
    const [notification, _setNotification] = useState('');
    const [token, _setToken] = useState<string | null>(localStorage.getItem("ACCESS_TOKEN"));

    const setNotification = (message: string) => {
        _setNotification(message);
        setTimeout(() => {
            _setNotification('');
        }, 3000);
    }

    const setToken = (token: string | null) => {
        _setToken(token);
        if (token) {
            localStorage.setItem("ACCESS_TOKEN", token);
        } else {
            localStorage.removeItem("ACCESS_TOKEN");
        }
    }

    return (
        <StateContext.Provider value={{ user, token, setUser, setToken, notification, setNotification }}>
            {children}
        </StateContext.Provider>
    );
};

export const useStateContext = () => useContext(StateContext);
