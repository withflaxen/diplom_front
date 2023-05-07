import {Rule} from 'effector-forms';

export const rules = {
    required: (): Rule<string> => ({
        name: "required",
        validator: (value) => Boolean(value),
        errorText: "Поле обязательно для заполнения"
    }),
    email: (): Rule<string> => ({
        name: "email",
        validator: (value) => /\S+@\S+\.\S+/.test(value),
        errorText: "Неверный формат"
    }),
    minLength: (min: number): Rule<string> => ({
        name: "minLength",
        validator: (value) => value.length >= min,
        errorText: `Минимальная длина ${min} символов!`
    }),
    maxLength: (max: number): Rule<string> => ({
        name: "maxLength",
        validator: (value) => value.length <= max,
        errorText: `Максимальная длина ${max} символов!`
    }),
}