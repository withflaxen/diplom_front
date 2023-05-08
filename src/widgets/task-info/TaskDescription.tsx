import React from "react";
import {
    Box,
    Heading,
    Stack,
    Text,
} from "@chakra-ui/react";

type Kata = {
    name: string;
    description: string;
    examples: string[];
};

function KataCard({ kata }: { kata: Kata }) {
    return (
        <Box border='2px solid grey' p={4} borderRadius="1rem" height='100%'>
            <Heading as="h1" color="white" mb={4}>
                {kata.name}
            </Heading>
            <Text color="white" mb={4}>
                {kata.description}
            </Text>
            <Heading as="h2" color="white" mb={2}>
                Examples
            </Heading>
            <Stack spacing={4}>
                {kata.examples.map((example) => (
                    <Box key={example} bg="black" borderRadius='1rem' p={4}>
                        <Text color="grey">{example}</Text>
                    </Box>
                ))}
            </Stack>
        </Box>
    );
}
const instructions = 'Complete the solution so that it splits the string into pairs of two characters. If the string contains an odd number of characters then it should replace the missing second character of the final pair with an underscore (\'_\').'

const kata: Kata = {
    name: "Sum of Two Numbers",
    description:
       instructions,
    examples: ['* abc =>  [ab, c]', '* abcdef => [ab, cd, ef]']
};

export const TaskDescription = () => {
    return (
        <KataCard kata={kata} />
    );
};