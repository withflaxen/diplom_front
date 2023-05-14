import {useState} from 'react';
import React from 'react';
import Editor from 'react-simple-code-editor';
import { highlight, languages } from 'prismjs';
import 'prismjs/components/prism-clike';
import 'prismjs/components/prism-javascript';
import 'prismjs/themes/prism.css';
import './styles.css';
import {useStore} from 'effector-react';
import {$task} from '../../entities/task/model';
import {ITask} from '../../shared/api/types';
import {setSolution} from './model';


export const CodeInputField = () => {
    const task = useStore($task) || {} as ITask;

    const [code, setCode] = useState(
        `function ${task.name}(${task.args?.join(",")}) {  }`
    );
    return (
        <Editor
            value={code}
            onValueChange={code => {
                setCode(code);
                setSolution(code);
            }}
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



