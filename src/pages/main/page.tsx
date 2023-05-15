import React, {FC, useState} from 'react';
import {HeaderPageWrapper} from '../../shared/ui';
import {
    Box, Flex,
    Heading, Switch, Text,
} from '@chakra-ui/react';
import {$tasks} from '../../entities/task/model';
import {MainPageGate} from './model';
import {useGate, useStore} from 'effector-react';
import {NavLink} from 'react-router-dom';
import {ITask, IUser} from '../../shared/api/types';
import {$user} from '../login/model';

const difficultyToColor = {
    "easy":"green",
    "medium":"yellow",
    "hard":"red"
}

const TaskCard:FC<ITask & {user:IUser}> = (props) => {
    const {title,difficulty,description,id,users, user: {username}} = props;
    const alreadySolved = (users ?? []).includes(username);
    return (
        <Box border="2px solid grey" borderRadius="1rem" p='2rem' mb='3rem' opacity={alreadySolved ? 0.2 : 1}>
            <Box as={NavLink} to={`/task/${id}`}>
               <Flex justifyContent='space-between'>
                   <Heading>{title}{alreadySolved && ' (solved)'}</Heading>
                   <Text fontSize="3rem" color={difficultyToColor[difficulty]}>{difficulty}</Text>
               </Flex>
                <Text fontSize="1.5rem">
                    {description}
                </Text>
            </Box>
        </Box>
    )
}

function Profile() {

    useGate(MainPageGate);
    const tasks = useStore($tasks);
    const user = useStore($user);
    const [onlySolved,setOnlySolved] = useState(false);
    return (
        <Box p={'4rem'} bg="gray.900" minH="100vh">
            <Switch colorScheme="green" mb='3rem' size='lg' isChecked={onlySolved} onChange={()=>setOnlySolved(p=>!p)}>Show only not solved</Switch>
            <Box>
                {
                    tasks
                        .filter(task=> onlySolved ? !(task.users||[]).includes(user?.username!):task)
                        .map((task:any,i)=>(<TaskCard key={i} {...task} user={user}/>))
                }
            </Box>

        </Box>
    );
}


export const Main = () => {
    return (
        <HeaderPageWrapper>
            <Profile/>
        </HeaderPageWrapper>
    );
};

