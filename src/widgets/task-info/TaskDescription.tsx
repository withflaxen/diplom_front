import React from "react";
import {
    Box,
    Heading,
    Stack,
    Text,
} from "@chakra-ui/react";
import {useStore} from 'effector-react';
import {$task} from '../../entities/task/model';
import {ITask} from '../../shared/api/types';

function KataCard() {
    const task = useStore($task) || {} as ITask;

    return (
        <Box border='2px solid grey' p={4} borderRadius="1rem" height='100%'>
            <Heading as="h1" color="white" mb={4}>
                {task.title}
            </Heading>
            <Text color="white" mb={4}>
                {task.description}
            </Text>
            <Heading as="h2" color="white" mb={2}>
                Examples
            </Heading>
            <Stack spacing={4}>
                {task.examples?.map((example) => (
                    <Box key={example} bg="black" borderRadius='1rem' p={4}>
                        <Text color="grey">{example}</Text>
                    </Box>
                ))}
            </Stack>
        </Box>
    );
}

export const TaskDescription = () => {
    return (
        <KataCard/>
    );
};