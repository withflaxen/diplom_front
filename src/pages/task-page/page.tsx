import React from 'react';
import {SimpleGrid} from '@chakra-ui/react';
import {HeaderPageWrapper} from '../../shared/ui';
import {CodeInputField} from '../../widgets/code-input-field/CodeInputField';
import {TaskInfo} from '../../widgets/task-info/TaskInfo';
import {ButtonsBlock} from './ButtonsBlock';

export const TaskPage = () => {
    return (
        <HeaderPageWrapper>
            <SimpleGrid columns={2} gap={6} gridTemplateColumns='35% 1fr' height='100%' gridTemplateRows='1fr 4rem'>
                <TaskInfo/>
                <CodeInputField/>
                <ButtonsBlock/>
            </SimpleGrid>
        </HeaderPageWrapper>
    )
};

