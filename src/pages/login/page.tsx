import React from 'react';
import {Button, Email, LoginWrapper, Password} from '../../shared/ui';
import {Center, Stack} from '@chakra-ui/react';
import {useForm} from 'effector-forms';
import {loginForm} from './model';
import {Link} from '../../shared/ui';

export const LoginPage = () => {
    const {submit:login,eachValid} = useForm(loginForm);
    const {email,password} = loginForm.fields;
    return (
        <LoginWrapper>
            <Stack spacing={5}>
                <Email field={email}/>
                <Password field={password}/>
                <Center>
                    <Button width="5rem" isDisabled={!eachValid} onClick={()=>login()}>Login</Button>
                </Center>
                <Center>
                    <Link to='/signup'>Don't have an account? Sign up!</Link>
                </Center>
            </Stack>
        </LoginWrapper>
    );
};

