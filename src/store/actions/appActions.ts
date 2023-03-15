import { AnyAction } from "redux"
import { ThunkDispatch } from "redux-thunk"
import { appReducer } from "../reducers/appReducer"

import {translateWord, YA_DICT_API_KEY} from '../../apis/yaDict';

import { store } from "..";
import { getLangs } from "../../apis/countryName";


export const setCurrentInput = (value: string) => {
    return {
        type: 'SET_CURRENT_INPUT',
        payload: value,
    }
}

export const setTranslation = (value: any) => {
    return {
        type: 'SET_TRANSLATION',
        payload: value,
    }
}
export const translateCurrentWord = () => async (dispatch: ThunkDispatch<ReturnType<typeof appReducer>, void, AnyAction>) => {
    const { fromLanguage, toLanguage, currentInput } = store.getState();

    const response = await translateWord({key: YA_DICT_API_KEY, lang: `${fromLanguage}-${toLanguage}`, text: currentInput});

    if (response.def.length) {
        dispatch(setTranslation(response.def || 'Перевести слово невозможно')) //здесь надо будет выводить ВСЕ результаты и показывать их fr показатель графически
    }
    else {
        dispatch(setTranslation('Перевести слово невозможно'))
    }
}

const setUploadedLangs = (langs: Awaited<ReturnType<typeof getLangs> | null>) => {
    return {
        type: 'SET_UPLOADED_LANGS',
        payload: langs,
    }
}
const setFromLangs = () => {
    const { uploadedLangs } = store.getState();

    if ( uploadedLangs ) {
        return {
            type: 'SET_FROM_LANGS',
            payload: Object.keys(uploadedLangs).map(l => l.split('-'))
        }
    }
    return {
        type: 'SET_FROM_LANGS',
        payload: uploadedLangs
    }

}
const setToLangs = (fromLanguage: string) => {
    const { uploadedLangs } = store.getState();

    const neededKey = Object.keys(uploadedLangs!).find(k => k.split('-')[0] === fromLanguage) as keyof typeof uploadedLangs;

    return {
        type: 'SET_TO_LANGS',
        payload: uploadedLangs![neededKey].map(l => l.split('-'))
    }
}
export const loadLanguages = () => async (dispatch: ThunkDispatch<ReturnType<typeof appReducer>, void, AnyAction>) => {
    getLangs()
        .then(res => {
            dispatch(setUploadedLangs(res));
            dispatch(setFromLangs());
        })
}

const setFromLanguage = (value: string) => {
    return {
        type: 'SET_FROM_LANGUAGE',
        payload: value
    }
}
export const chooseFromLanguage = (value: string) => (dispatch: ThunkDispatch<ReturnType<typeof appReducer>, void, AnyAction>) => {
    dispatch(setFromLanguage(value));
    dispatch(setToLangs(value));
    dispatch(setToLanguage(''));
}
export const setToLanguage = (value: string) => {
    return {
        type: 'SET_TO_LANGUAGE',
        payload: value
    }
}