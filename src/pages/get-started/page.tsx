import React from 'react';
import {Header} from '../../widgets';
import {Center} from '@chakra-ui/react';
import {Button} from '../../shared/ui';
import {NavLink} from 'react-router-dom';

export const GetStarted = () => {
    return (
        <>
            <Header/>
                <Center pt='20%'>
                    <Button as={NavLink} to={'/login'}>
                        Get Started
                    </Button>
                </Center>
        </>
    );
};

