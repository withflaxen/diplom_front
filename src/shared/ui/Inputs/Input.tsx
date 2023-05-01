import React, {FC} from 'react';
import {Input as ChakraInput} from '@chakra-ui/react';
import {InputProps} from '@chakra-ui/input/dist/input';
import {Field, useField} from 'effector-forms';

export type BaseInputProps = InputProps & {field: Field<any>};

export const Input:FC<BaseInputProps> = ({field,...props}) => {
    const {value,onChange,errors} = useField(field);

    return (
        <ChakraInput
            size="md"
            border={'none'}
            background={'black'}
            focusBorderColor={'white'}
            value={value}
            onChange={(e)=>onChange(e.target.value)}
            autoComplete="new-password"
            {...props}/>
    );
};

