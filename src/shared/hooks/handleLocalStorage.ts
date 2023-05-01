import { useState } from "react";
import {createEvent, createStore} from 'effector';

export const useLocalStorage = (keyName:string, defaultValue:any) => {
    const [storedValue, setStoredValue] = useState(() => {
        try {
            const value = window.localStorage.getItem(keyName);

            if (value) {
                return JSON.parse(value);
            } else {
                window.localStorage.setItem(keyName, JSON.stringify(defaultValue));
                return defaultValue;
            }
        } catch (err) {
            return defaultValue;
        }
    });

    const setValue = (newValue:string) => {
        try {
            window.localStorage.setItem(keyName, JSON.stringify(newValue));
        } catch (err) {}
        setStoredValue(newValue);
    };

    return [storedValue, setValue];
};

const getValueFromLocalStorage = ()

export const localStorageFactory = () => {
    const $value = createStore('');

    const setValue = createEvent<{key:string,value:any}>();


}