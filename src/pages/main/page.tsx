import React from 'react';
import {Button} from '../../shared/ui';
import {useAuth} from '../login/AuthProvider';

export const Main = () => {
    const {logout} = useAuth();
    return (
        <div>
            <Button onClick={logout}>Logout</Button>
        </div>
    );
};

