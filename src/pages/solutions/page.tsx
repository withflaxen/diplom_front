import React, { useState } from "react";
import {
    Box,
    Button,
    Flex,
    Heading,
    Icon,
    Image,
    Input,
    Link,
    Stack,
    Text,
} from "@chakra-ui/react";
import { FaThumbsUp } from "react-icons/fa";

// тип для описания данных решения
type Solution = {
    user: string;
    language: string;
    code: string;
    votes: number;
    comments: Comment[];
};

// тип для описания данных комментария
type Comment = {
    user: string;
    text: string;
};

// компонент для отображения решения
function SolutionCard({ solution }: { solution: Solution }) {
    // состояние для отслеживания голосов за решение
    const [votes, setVotes] = useState(solution.votes);
    // состояние для отслеживания комментариев к решению
    const [comments, setComments] = useState(solution.comments);
    // состояние для отслеживания видимости формы для добавления комментария
    const [showForm, setShowForm] = useState(false);
    // состояние для отслеживания текста нового комментария
    const [newComment, setNewComment] = useState("");
    // функция для обработки клика по кнопке голосования
    const handleVoteClick = () => {
        // увеличиваем количество голосов на один
        setVotes((prev) => prev + 1);
        // TODO: отправить запрос на сервер для обновления голосов
    };
    // функция для обработки добавления комментария
    const handleAddComment = (comment: Comment) => {
        // добавляем новый комментарий к массиву комментариев
        setComments((prev) => [...prev, comment]);
        // TODO: отправить запрос на сервер для добавления комментария
        // скрываем форму и очищаем текст нового комментария
        setShowForm(false);
        setNewComment("");
    };
    // функция для обработки клика по кнопке показать/скрыть форму
    const handleShowFormClick = () => {
        // переключаем видимость формы
        setShowForm((prev) => !prev);
        // очищаем текст нового комментария
        setNewComment("");
    };
    // функция для обработки изменения текста нового комментария
    const handleNewCommentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        // обновляем текст нового комментария
        setNewComment(e.target.value);
    };
    return (
        <Box bg="gray.800" p={4} borderRadius="md" mb={4}>
            <Flex direction="row" align="center" justify="space-between">
                <Box>
                    <Text color="white">{solution.user}</Text>
                    <Text color="white">{solution.language}</Text>
                </Box>
                <Button colorScheme="blue" onClick={handleVoteClick}>
                    <Icon as={FaThumbsUp} mr={2} />
                    {votes}
                </Button>
            </Flex>
            <Box bg="black" p={4} mt={4}>
                <Text color="white">{solution.code}</Text>
            </Box>
            <Box mt={4}>
                <Heading as="h3" color="white" mb={2}>
                    Comments ({comments.length})
                </Heading>
                {comments.map((comment) => (
                    <Box key={comment.user} bg="gray.700" p={2} borderRadius="md" mb={2}>
                        <Text color="white">{comment.user}</Text>
                        <Text color="white">{comment.text}</Text>
                    </Box>
                ))}
                {/* добавляем кнопку для показа/скрытия формы */}
                <Button colorScheme="blue" onClick={handleShowFormClick}>
                    {showForm ? "Hide form" : "Show form"}
                </Button>
                {/* добавляем условный рендеринг формы в зависимости от состояния showForm */}
                {showForm && (
                    <Flex direction="row" align="center" mt={2}>
                        {/* добавляем инпут для ввода нового комментария */}
                        <Input
                            value={newComment}
                            onChange={handleNewCommentChange}
                            placeholder="Type your comment"
                            mr={2}
                        />
                        {/* добавляем кнопку для отправки нового комментария */}
                        <Button
                            colorScheme="green"
                            onClick={() =>
                                handleAddComment({
                                    user: "Current User", // TODO: заменить на имя текущего пользователя
                                    text: newComment,
                                })
                            }
                        >
                            Add comment
                        </Button>
                    </Flex>
                )}
            </Box>
        </Box>
    );
}

// пример данных решений
const solutions: Solution[] = [
    {
        user: "User1",
        language: "JavaScript",
        code: `function sum(a, b) {
      return a + b;
    }`,
        votes: 10,
        comments: [
            {
                user: "User2",
                text: "Nice and simple solution!",
            },
            {
                user: "User3",
                text: "I like how you used arrow functions.",
            },
        ],
    },
    {
        user: "User4",
        language: "Python",
        code: `def sum(a, b):
      return a + b`,
        votes: 5,
        comments: [
            {
                user: "User5",
                text: "This is the same as my solution.",
            },
            {
                user: "User6",
                text: "You could use lambda for a shorter solution.",
            },
        ],
    },
];

export const SolutionsPage = () => {
    return (
        // рендерим компонент решения с данными решения
        <SolutionCard solution={solutions[0]} />
    );
};