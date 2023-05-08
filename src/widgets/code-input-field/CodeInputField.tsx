import {useState} from 'react';
import React from 'react';
import Editor from 'react-simple-code-editor';
import { highlight, languages } from 'prismjs';
import 'prismjs/components/prism-clike';
import 'prismjs/components/prism-javascript';
import 'prismjs/themes/prism.css';
import {parseFunction} from '../../shared/utils';
import './styles.css';
const functionName = 'addNumber';
const argumentsList = ['a','b'];

export const CodeInputField = () => {
    const [code, setCode] = useState(
        `function ${functionName}(${argumentsList.join(",")}) {  return a + b;}`
    );
    console.log(parseFunction(code)?.args,parseFunction(code)?.body)
    return (
        <Editor
            value={code}
            onValueChange={code => setCode(code)}
            // @ts-ignore
            highlight={code => highlight(code, languages.js)}
            padding={10}
            style={{
                fontFamily: '"Fira code", "Fira Mono", monospace',
                fontSize: 20,
                border: '2px solid grey',
                borderRadius: '1rem',
                marginTop: '3rem'
            }}
        />
    );
}



