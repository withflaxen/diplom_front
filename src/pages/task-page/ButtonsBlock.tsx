import React from 'react';
import {Button} from '../../shared/ui';
import {Box, Center} from '@chakra-ui/react';
import {$failedCount, postSolution, testTask} from '../../widgets/code-input-field/model';
import {useStore} from 'effector-react';

export const ButtonsBlock = () => {
    const failedCount = useStore($failedCount);

    return (
        <Box gridColumnStart={2}>
            <Center width='40%' display='flex' gap='5rem' margin='0 auto'>
                <Button width='10rem' onClick={()=>testTask()}>
                    Test
                </Button>
                <Button width='10rem' disabled={failedCount!==0} onClick={()=>postSolution()}>
                    Submit
                </Button>
            </Center>
        </Box>
    );
};

