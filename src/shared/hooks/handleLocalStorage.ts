import {createEvent, forward, restore, sample, Unit} from 'effector';
import {createEffect} from 'effector/compat';


export const localStorageFactory = (key:string,defaultValue:any,trigger:Unit<any>) => {
    const fxGetInitialValue = createEffect<{key: string, defaultValue: any},string>(({key, defaultValue}) => {
        try {
            const value = window.localStorage.getItem(key);

            if (value) {
                return JSON.parse(value);
            } else {
                window.localStorage.setItem(key, JSON.stringify(defaultValue));
                return defaultValue;
            }
        } catch (err) {
            return defaultValue;
        }
    });
    sample({
        clock: trigger,
        fn: ()=>({key,defaultValue}),
        target: fxGetInitialValue
    })

    const setValue = createEvent<any>();
    const resetValue = createEvent<any>();
    const $value = restore(setValue,null);

    const fxSetValue = createEffect<any,void>((newValue)=>{
            window.localStorage.setItem(key, JSON.stringify(newValue));
            return newValue;
    });

    forward({
        from:[fxGetInitialValue.doneData,fxSetValue.doneData],
        to: setValue
    });
    $value.reset(resetValue)


    return {$value,setValue,resetValue};
}