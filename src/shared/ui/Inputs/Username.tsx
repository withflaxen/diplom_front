import {InputGroup, InputLeftElement} from '@chakra-ui/react';
import {BaseInputProps, Input} from './Input';
import {PlaceHolders} from '../../constants';
import {Icon} from '@chakra-ui/icons';
import {BsPerson} from 'react-icons/bs';
import {FC} from 'react';

export const Username:FC<BaseInputProps> = (props) => {
    return (
        <InputGroup size="md">
            <InputLeftElement
                pointerEvents='none'
                children={ <Icon as={BsPerson}/>}
            />
            <Input pl="2.5rem" size="md" placeholder={PlaceHolders.username} {...props}/>
        </InputGroup>
    );
};
