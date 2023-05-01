import {createContext, FC, useContext, useMemo} from 'react';
import { useNavigate } from "react-router-dom";
import {useGate, useStore} from 'effector-react';
import {$user, loginGate, logout} from './model';

const AuthContext = createContext({} as {user:any,logout:any});

export const AuthProvider:FC<any> = ({ children }) => {

    const user = useStore($user);
    const navigate = useNavigate();

    useGate(loginGate,navigate);

    const value = useMemo(
        () => ({
            user,
            logout
        }),
        [user]
    );

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
    return useContext(AuthContext);
};