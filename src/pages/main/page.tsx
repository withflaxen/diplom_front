import React from 'react';
import {HeaderPageWrapper} from '../../shared/ui';
import {
    Box,
    Button,
    Flex,
    Heading,
    Image,
    Link,
    Stack,
    Text,
} from "@chakra-ui/react";

// тип для описания данных профиля пользователя
type UserProfile = {
    name: string;
    clan: string;
    memberSince: string;
    lastSeen: string;
    profiles: Record<string, string>;
    following: number;
    followers: number;
    allies: number;
    rank: string;
    honor: number;
    totalCompletedKata: number;
    languages: Record<string, string>;
};

// компонент для отображения профиля пользователя
function Profile({ user }: { user: UserProfile }) {
    return (
        <Box p={4} bg="gray.900" minH="100vh">
            <Flex direction="column" align="center">
                <Box w="80%" mb={4}>
                    <Heading as="h1" color="white">
                        {user.name}
                    </Heading>
                    <Text color="white">{user.clan}</Text>
                    <Text color="white">Member Since: {user.memberSince}</Text>
                    <Text color="white">Last Seen: {user.lastSeen}</Text>
                    <Stack direction="row" spacing={4}>
                        {Object.entries(user.profiles).map(([key, value]) => (
                            <Link key={key} href={value} color="blue.300">
                                {key}
                            </Link>
                        ))}
                    </Stack>
                </Box>
                <Box w="80%" mb={4}>
                    <Flex direction="row" justify="space-between">
                        <Button colorScheme="blue">Following ({user.following})</Button>
                        <Button colorScheme="blue">Followers ({user.followers})</Button>
                        <Button colorScheme="blue">Allies ({user.allies})</Button>
                    </Flex>
                </Box>
                <Box w="80%" mb={4} bg="gray.800" p={4} borderRadius="md">
                    <Heading as="h2" color="white" mb={4}>
                        Stats
                    </Heading>
                    <Flex direction="row" justify="space-between">
                        <Box>
                            <Text color="white">Rank:</Text>
                            <Image src={`https://www.codewars.com/users/${user.name}/badges/large`} />
                        </Box>
                        <Box>
                            <Text color="white">Honor:</Text>
                            <Text fontSize="3xl" fontWeight="bold" color="white">
                                {user.honor}
                            </Text>
                        </Box>
                        <Box>
                            <Text color="white">Total Completed Kata:</Text>
                            <Text fontSize="3xl" fontWeight="bold" color="white">
                                {user.totalCompletedKata}
                            </Text>
                        </Box>
                    </Flex>
                </Box>
                <Box w="80%" mb={4} bg="gray.800" p={4} borderRadius="md">
                    <Heading as="h2" color="white" mb={4}>
                        Languages
                    </Heading>
                    <Stack direction="row" spacing={4}>
                        {Object.entries(user.languages).map(([key, value]) => (
                            <Box key={key}>
                                <Text color="white">{key}</Text>
                                <Image src={`https://www.codewars.com/users/${user.name}/badges/small`} />
                                <Text color="white">{value}</Text>
                            </Box>
                        ))}
                    </Stack>
                </Box>
            </Flex>
        </Box>
    );
}

// пример данных профиля пользователя
const user: UserProfile = {
    name: "User",
    clan: "Unknown",
    memberSince: "Aug 2014",
    lastSeen: "Aug 2014",
    profiles: {
        GitHub: "https://github.com/user",
        Twitter: "https://twitter.com/user",
        LinkedIn: "https://linkedin.com/user",
    },
    following: 0,
    followers: 0,
    allies: 0,
    rank: "8 kyu",
    honor: 4,
    totalCompletedKata: 2,
    languages: {
        Python: "8 kyu",
        JavaScript: "7 kyu",
        TypeScript: "6 kyu",
        "C#": "5 kyu",
    Java: "4 kyu",
    Ruby: "3 kyu",
    "C++": "2 kyu",
    Haskell: "1 kyu",
    SQL: "1 dan",
    Rust: "2 dan",
    Go: "3 dan",
    Swift: "4 dan",
    Kotlin: "5 dan",
    Dart: "6 dan",
    PHP: "7 dan",
    Scala: "8 dan",
},
};

export const Main = () => {
    return (
        <HeaderPageWrapper>
            <Profile user={user} />
        </HeaderPageWrapper>
    );
};

