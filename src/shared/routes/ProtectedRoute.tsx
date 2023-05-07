import React, {FC} from 'react';
import {Navigate} from 'react-router-dom';

export const ProtectedRoute:FC<any> = ({ children }) => {

    if (!localStorage.getItem('token')) return <Navigate to="/" replace />;

    return children;
};
