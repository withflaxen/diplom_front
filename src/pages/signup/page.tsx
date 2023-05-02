import React from 'react';
import {Button, Email, Link, LoginWrapper, Password, Username} from '../../shared/ui';
import {Center, Stack} from '@chakra-ui/react';
import {BoxProps} from '@chakra-ui/layout/dist/box';
import {useForm} from 'effector-forms';
import {signUpForm} from './model';


const BoxStyles:BoxProps = {
    width:"40%",
    mt:"10rem",
    backgroundColor:"#101114",
    padding:"2rem",
}
export const SignUpPage = () => {
    const {submit, eachValid, errors} = useForm(signUpForm);
    const {username,password,email} = signUpForm.fields;
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
                </Stack>
        </LoginWrapper>
    );
};

