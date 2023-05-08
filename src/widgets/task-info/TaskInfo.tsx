import React from 'react';
import {Box, Tab, TabList, TabPanel, TabPanels, Tabs} from '@chakra-ui/react';
import {CodeOutput} from '../code-output/CodeOutput';
import {TaskDescription} from './TaskDescription';

export const TaskInfo = () => {
    return (
        <Box height='100%'>
            <Tabs variant='soft-rounded' size='lg' display='grid' gridTemplateRows='min-content 1fr' height='100%' colorScheme='gray' >
                <TabList width='100%'>
                    <Tab width='10rem'>Instructions</Tab>
                    <Tab width='10rem'>Output</Tab>
                </TabList>

                <TabPanels height='100%'>
                    <TabPanel height='100%' padding={'0.5rem 0 0 0'}>
                        <TaskDescription/>
                    </TabPanel>
                    <TabPanel height='100%' padding={'0.5rem 0 0 0'}>
                        <CodeOutput/>
                    </TabPanel>
                </TabPanels>
            </Tabs>
        </Box>
    );
};

