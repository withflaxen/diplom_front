import React, {FC} from 'react';
import {Navigate} from 'react-router-dom';

export const NotLoggedOnly:FC<any> = ({ children }) => {

    if (localStorage.getItem('token')) return <Navigate to="/main" replace />;

    return children;
};
