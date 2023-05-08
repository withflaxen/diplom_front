import React from 'react';
import {Button} from '../../shared/ui';
import {Box, Center} from '@chakra-ui/react';

export const ButtonsBlock = () => {
    return (
        <Box gridColumnStart={2}>
            <Center width='40%' display='flex' gap='5rem' margin='0 auto'>
                <Button width='10rem'>
                    Test
                </Button>
                <Button width='10rem'>
                    Submit
                </Button>
            </Center>
        </Box>
    );
};

