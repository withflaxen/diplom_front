import {createContext, FC, useContext, useMemo} from 'react';
import { useNavigate } from "react-router-dom";
import {useLocalStorage} from '../../../shared/hooks/useLocalStorage';

const AuthContext = createContext({});

export const AuthProvider:FC<any> = ({ children }) => {
    const [user, setUser] = useLocalStorage("user", null);
    const navigate = useNavigate();

    const login = async (data:any) => {
        setUser(data);
        navigate("/dashboard/profile", { replace: true });
    };

    const logout = () => {
        setUser(null);
        navigate("/", { replace: true });
    };

    const value = useMemo(
        () => ({
            user,
            login,
            logout
        }),
        [user]
    );

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
    return useContext(AuthContext);
};