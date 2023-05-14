import React, { useState } from "react";
import {
    Box,
    Flex,
    Heading,
    Icon,
    Input,
    Text,
} from "@chakra-ui/react";
import { FaThumbsUp } from "react-icons/fa";
import {useGate, useStore} from 'effector-react';
import {$solutions, addComment, clickDeleteComment, clickLikeBtn, SolutionPageGate} from './model';
import {Header} from '../../widgets';
import {$user} from '../login/model';
import { Button } from "../../shared/ui";
import {highlight, languages} from 'prismjs';
import Editor from 'react-simple-code-editor';
import './styles.css';
import {useParams} from 'react-router-dom';
import {ISolution} from '../../shared/api/types';


// компонент для отображения решения
function SolutionCard({ solution }: { solution: ISolution }) {
    const user = useStore($user);
    const [newComment, setNewComment] = useState('');
    const handleVoteClick = () => {
        clickLikeBtn({ solutionID:solution.id, userID:user?.id!})
    };
    const comments = solution.comments;

    const [showMore,setShowMore] = useState(false);
    const handleNewCommentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setNewComment(e.target.value);
    };
    return (
        <Box bg="gray.800" p={4} borderRadius="md" mb={4}>
            <Flex direction="row" align="center" justify="space-between">
                <Box>
                    <Text color="white" fontSize='20px' fontStyle='italic'>{solution.username}</Text>
                </Box>
                <Button colorScheme="blue" onClick={handleVoteClick}>
                    <Icon as={FaThumbsUp} color={solution.isActive ? 'green' : 'white'} mr={2} />
                    {solution.likes}
                </Button>
            </Flex>
            <Box bg="black" p={4} mt={4} borderRadius='1rem'>
                <Editor
                    className='solution'
                    value={solution.solution}
                    onValueChange={()=>{}}
                    disabled
                    // @ts-ignore
                    highlight={code => highlight(code, languages.js)}
                    padding={10}
                    style={{
                        fontFamily: '"Fira code", "Fira Mono", monospace',
                        fontSize: 20,
                    }}
                />
            </Box>
            <Box mt={4}>
                <Heading as="h6" fontSize='20px' color="white" mb={2}>
                    Comments ({comments?.length??0})
                </Heading>
                {
                    !!comments && (
                        <>
                            {comments.slice(showMore?0:comments.length-1).map((comment) => (
                                <>
                                    <Box display='flex' justifyContent='space-between' key={comment.username} bg="gray.700" p={2} borderRadius="md" mb={2}>
                                        <Box>
                                            <Text color="white" fontSize='20px' fontStyle='italic'>{comment.username}</Text>
                                            <Text color="white">{comment.comment}</Text>
                                        </Box>
                                        <Button alignSelf='flex-end' onClick={()=>clickDeleteComment({solutionID:solution.id,id:comment.id!})}>
                                            Delete
                                        </Button>
                                    </Box>
                                </>
                            ))}
                        </>
                    )
                }
                {
                    comments.length > 1 && (
                        <Button onClick={()=>setShowMore(p=>!p)}>
                            {showMore ? 'Hide' : 'Show More'}
                        </Button>
                    )
                }

                <Flex direction="row" align="center" mt={2}>
                        <Input
                            value={newComment}
                            onChange={handleNewCommentChange}
                            placeholder="Type your comment"
                            mr={2}
                        />
                        <Button
                            onClick={() =>{
                                addComment({
                                    solutionID: solution.id,
                                    username: user?.username!,
                                    comment: newComment,
                                });
                                setNewComment('');
                            }}
                        >
                            Add comment
                        </Button>
                    </Flex>

            </Box>
        </Box>
    );
}

// пример данных решений


export const SolutionsPage = () => {
    const {id} = useParams();
    useGate(SolutionPageGate,id);
    const solutions = useStore($solutions);
    return (
        // рендерим компонент решения с данными решения
        <>
            <Header/>
            <Box padding='6rem'>
                {
                    solutions.map((e:ISolution,i:number)=><SolutionCard key={i} solution={e}/>)
                }
            </Box>
        </>
    );
};