import React, {FC} from 'react';
import {InputGroup, InputLeftElement} from '@chakra-ui/react';
import {BaseInputProps, Input} from './Input';
import {PlaceHolders} from '../../constants';
import {LockIcon} from '@chakra-ui/icons';

export const Password:FC<BaseInputProps> = (props) => {
    return (
        <InputGroup size="md">
            <InputLeftElement
                pointerEvents='none'
                children={<LockIcon/>}
            />
            <Input pl="2.5rem" size="md"  type="password" placeholder={PlaceHolders.password} {...props}/>
        </InputGroup>
    );
};

