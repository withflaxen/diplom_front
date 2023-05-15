import React, {FC, useEffect, useState} from 'react';
import {
    Center,
    Heading,
    Stack,
    Table,
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
import {$tasks, fxFetchTasks, saveTask} from './model';

export const Td:FC<any> = ({children}) => {
    return <ChakraTd minWidth={'7rem'}>{children}</ChakraTd>
}

const TableItem:FC<any> = ({title, description, difficulty, name, args}) =>{
    return (
        <Tr>
            <Td>{title}</Td>
            <Td>{description}</Td>
            <Td isNumeric>{difficulty}</Td>
            <Td isNumeric>{name}</Td>
            <Td isNumeric>{args}</Td>
        </Tr>
    )
}
//title, description, testName, difficulty, solutions, users, name, args

export const CreateTaskPage = () => {
    const [title,setTitle] = useState("");
    const [description,setDescription] = useState("");
    const [difficulty,setDifficulty] = useState("");
    const [name,setName] = useState("");
    const [args,setArgs] = useState("");
    const tasks = useStore($tasks)
    useEffect(()=>{
        fxFetchTasks()
    },[])
    return (
        <HeaderPageWrapper>
            <LoginWrapper width={'80%'}>
                <Heading>Create Task</Heading>
                <Stack spacing={5}>
                    <TableContainer>
                        <Table variant='simple'>
                            <Thead>
                                <Tr>
                                    <Th>title</Th>
                                    <Th>description</Th>
                                    <Th>difficulty</Th>
                                    <Th>name</Th>
                                    <Th>args</Th>
                                </Tr>
                            </Thead>
                            <Tbody>
                                {tasks.map(task=><TableItem {...task}/>)}
                            </Tbody>
                            <Tfoot>
                                <Tr>
                                    <Th><InputBase minWidth='7rem' value={title} onChange={(e)=>setTitle(e.target.value)}/></Th>
                                    <Th isNumeric><InputBase minWidth='7rem' value={description} onChange={(e)=>setDescription(e.target.value)}/></Th>
                                    <Th isNumeric><InputBase minWidth='7rem' value={difficulty} onChange={(e)=>setDifficulty(e.target.value)}/></Th>
                                    <Th isNumeric><InputBase minWidth='7rem' value={name} onChange={(e)=>setName(e.target.value)}/></Th>
                                    <Th isNumeric><InputBase minWidth='7rem' value={args} onChange={(e)=>setArgs(e.target.value)}/></Th>
                                </Tr>
                            </Tfoot>
                        </Table>
                    </TableContainer>
                    <Center>
                        <Button onClick={()=>{
                            saveTask({title, description, difficulty, name, args});
                            setTitle('')
                            setDescription('')
                            setDifficulty('')
                            setName('')
                            setArgs('')

                        }}>Save Task</Button>
                    </Center>
                </Stack>
            </LoginWrapper>
        </HeaderPageWrapper>
    );
};
