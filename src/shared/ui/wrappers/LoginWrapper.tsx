import React, {FC} from 'react';
import {BoxProps} from '@chakra-ui/layout/dist/box';
import {Box, Center } from '@chakra-ui/react';

const BoxStyles:BoxProps = {
    width:"40%",
    mt:"10rem",
    backgroundColor:"#101114",
    padding:"2rem",
}

export const LoginWrapper:FC<any> = ({children,width="40%"}) => {
    return (
        <Center>
            <Box {...BoxStyles} width={width}>
                {children}
            </Box>
        </Center>
    );
};

