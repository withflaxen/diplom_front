import React, {FC} from 'react';
import { Box, Heading, Flex } from "@chakra-ui/react";
import {Button} from '../../shared/ui';
import {NavLink} from 'react-router-dom';


export const Header:FC = (props) => {

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
            <Flex align="center" mr={5}>
                <Heading as="h1" size="lg" letterSpacing={"-.1rem"}>
                    Code Ninja
                </Heading>
            </Flex>


            <Box display="flex" gap="6rem" mr="10%">
                <Button as={NavLink} to={'/login'}>
                    Login
                </Button>
                <Button as={NavLink} to={'/signup'}>
                    Sign Up
                </Button>
            </Box>
        </Flex>
    );
};

