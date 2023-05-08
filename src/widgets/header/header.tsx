import React, {FC, useEffect} from 'react';
import { Box, Heading, Flex } from "@chakra-ui/react";
import {Button} from '../../shared/ui';
import {NavLink} from 'react-router-dom';
import {useAuth} from '../../pages/login/AuthProvider';


export const Header:FC = (props) => {
    const {logout,user} = useAuth();

    return (
        <Flex
            as="nav"
            align="center"
            justify="space-between"
            wrap="wrap"
            padding="1.5rem"
            color="white"
            bg="#101114"
            {...props}
        >
            <Flex align="center" mr={5} paddingLeft='10rem'>
                <NavLink to='/main'>
                <Heading as="h1" size="lg" letterSpacing={"-.1rem"}>
                    Code Ninja
                </Heading>
                </NavLink>
            </Flex>
            <Box display="flex" gap="6rem" mr="10%">
            {
        user ? (
                <Button onClick={logout}>
                    Logout
                </Button>
            ) :
            <>
                <Button as={NavLink} to={'/login'}>
                    Login
                </Button>
                <Button as={NavLink} to={'/signup'}>
                    Sign Up
                </Button></>
    }
</Box>
        </Flex>
    );
};

