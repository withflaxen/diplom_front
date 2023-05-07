import React, {FC} from 'react';
import {Button as ChakraButton} from '@chakra-ui/react';
import {ButtonProps} from '@chakra-ui/button/dist/button';

export const Button:FC<ButtonProps&{to?:string}> = (props) => {
    return (
        <ChakraButton _hover={{backgroundColor:"#CF4B32"}} backgroundColor="#BB432C" textColor="#FFF" size="md" {...props}/>
    );
};

