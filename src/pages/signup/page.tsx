import React from 'react';
import {Button, Email, Link, LoginWrapper, Password, Username} from '../../shared/ui';
import {Alert, AlertIcon, Center, Stack} from '@chakra-ui/react';
import {BoxProps} from '@chakra-ui/layout/dist/box';
import {useForm} from 'effector-forms';
import {$errorMessage, $successMessage, signUpForm} from './model';
import {useStore} from 'effector-react';


const BoxStyles:BoxProps = {
    width:"40%",
    mt:"10rem",
    backgroundColor:"#101114",
    padding:"2rem",
}
export const SignUpPage = () => {
    const {submit, eachValid, errors} = useForm(signUpForm);
    const {username,password,email} = signUpForm.fields;
    const successMessage = useStore($successMessage);
    const errorMessage = useStore($errorMessage);
    return (
        <LoginWrapper>
                <Stack spacing={5}>
                    <Email field={email}/>
                    <Username field={username}/>
                    <Password field={password}/>
                    <Center>
                        <Button width="5rem" isDisabled={!eachValid} onClick={()=>submit()}>Sign up</Button>
                    </Center>
                    <Center>
                        <Link to='/login'>Already have an account? Sign in!</Link>
                    </Center>
                    <Center>
                        {successMessage && <Alert status="success" variant="solid"><AlertIcon />{successMessage}</Alert>}
                    </Center>
                    <Center>
                        {errorMessage && <Alert status="success" variant="solid"><AlertIcon />{errorMessage}</Alert>}
                    </Center>
                </Stack>
        </LoginWrapper>
    );
};

