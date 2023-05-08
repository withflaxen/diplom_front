import React, {FC} from 'react';
import {Box} from '@chakra-ui/react';
import {Header} from '../../../widgets';

export const HeaderPageWrapper:FC<any> = ({children}) => {
    return (
        <Box display='grid' height='100vh' gridTemplateRows="min-content 1fr">
            <Header/>
            <Box padding={4}>
                {children}
            </Box>
        </Box>
    );
};

