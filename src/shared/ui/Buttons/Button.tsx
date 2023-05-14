import React, {FC} from 'react';
import {Button as ChakraButton} from '@chakra-ui/react';
import {ButtonProps} from '@chakra-ui/button/dist/button';

export const Button:FC<ButtonProps&{to?:string}> = (props) => {
    const color = props.disabled? 'gray' :"#BB432C";
    return (
        <ChakraButton _hover={{backgroundColor:`${color}`}} backgroundColor={color} textColor="#FFF" size="md" {...props}/>
    );
};

