import React, {FC} from 'react';
import {InputGroup, InputLeftElement} from '@chakra-ui/react';
import {BaseInputProps, Input} from './Input';
import {PlaceHolders} from '../../constants';
import {EmailIcon} from '@chakra-ui/icons';

export const Email:FC<BaseInputProps> = (props) => {
    return (
        <InputGroup size="md">
            <InputLeftElement
                pointerEvents='none'
                children={<EmailIcon/>}
            />
            <Input pl="2.5rem" size="md" placeholder={PlaceHolders.email} {...props}/>
        </InputGroup>
    );
};

