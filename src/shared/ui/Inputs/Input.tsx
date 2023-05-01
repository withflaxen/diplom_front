import React, {FC} from 'react';
import {Input as ChakraInput} from '@chakra-ui/react';
import {InputProps} from '@chakra-ui/input/dist/input';

export const Input:FC<InputProps> = (props) => {
    return (
        <ChakraInput size="md" border={'none'} background={'black'} focusBorderColor={'white'} {...props}/>
    );
};

