import React, {FC, useEffect, useState} from 'react';
import {
    Center,
    Heading,
    Stack,
    Table,
    TableCaption,
    TableContainer,
    Tbody,
    Td as ChakraTd,
    Tfoot,
    Th,
    Thead,
    Tr
} from '@chakra-ui/react';

import {Button, HeaderPageWrapper, LoginWrapper} from '../../shared/ui';
import {InputBase} from '../../shared/ui/Inputs/Input';
import {useStore} from 'effector-react';
import {IUser} from '../../shared/api/types';
import {$users, fxFetchUsers, saveUser} from './model';

export const Td:FC<any> = ({children}) => {
    return <ChakraTd minWidth={'7rem'}>{children}</ChakraTd>
}

const TableItem:FC<IUser> = ({username,email,role,_id,password}) =>{
    return (
        <Tr>
            <Td>{_id}</Td>
            <Td>{email}</Td>
            <Td isNumeric>{password}</Td>
            <Td isNumeric>{username}</Td>
            <Td isNumeric>{role}</Td>
        </Tr>
    )
}

export const CreateUserPage = () => {
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");
    const [username,setUsername] = useState("");
    const [role,setRole] = useState("");
    const users = useStore($users)
    useEffect(()=>{
        fxFetchUsers()
    },[])
    return (
        <HeaderPageWrapper>
            <LoginWrapper width={'80%'}>
                <Heading>Create User</Heading>
                <Stack spacing={5}>
                    <TableContainer>
                        <Table variant='simple'>
                            <Thead>
                                <Tr>
                                    <Th>userId</Th>
                                    <Th>email</Th>
                                    <Th>password</Th>
                                    <Th>username</Th>
                                    <Th>role</Th>
                                </Tr>
                            </Thead>
                            <Tbody>
                                {users.map(user=><TableItem {...user}/>)}
                            </Tbody>
                            <Tfoot>
                                <Tr>
                                    <Th>----</Th>
                                    <Th><InputBase minWidth='7rem' value={email} onChange={(e)=>setEmail(e.target.value)}/></Th>
                                    <Th isNumeric><InputBase minWidth='7rem' value={password} onChange={(e)=>setPassword(e.target.value)}/></Th>
                                    <Th isNumeric><InputBase minWidth='7rem' value={username} onChange={(e)=>setUsername(e.target.value)}/></Th>
                                    <Th isNumeric><InputBase minWidth='7rem' value={role} onChange={(e)=>setRole(e.target.value)}/></Th>
                                </Tr>
                            </Tfoot>
                        </Table>
                    </TableContainer>
                    <Center>
                        <Button onClick={()=>{
                            saveUser({email,password,username,role});
                            setEmail('')
                            setPassword('')
                            setUsername('')
                            setRole('')
                        }}>Save User</Button>
                    </Center>
                </Stack>
            </LoginWrapper>
        </HeaderPageWrapper>
    );
};
