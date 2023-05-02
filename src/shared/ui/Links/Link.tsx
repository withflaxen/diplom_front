import React, {FC} from 'react';
import {Link as ChakraLink, LinkProps} from '@chakra-ui/react';
import {NavLink} from 'react-router-dom';

export const Link:FC<LinkProps&{to?:string}> = (props) => {
    return (
        <ChakraLink {...props} as={NavLink} color="white">
            {props.children}
        </ChakraLink>
    );
};

