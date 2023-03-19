import { AnyAction } from "redux"
import { ThunkDispatch } from "redux-thunk"
import { appReducer } from "../reducers/appReducer"

import {translateWord, YA_DICT_API_KEY} from '../../apis/yaDict';

import { store } from "..";
import { getLangs } from "../../apis/countryName";

export const setLoading = (payload: boolean) => {
    return {
        type: 'SET_LOADING',
        payload
    }
}
export const setError = (payload: string | null) => {
    return {
        type: 'SET_ERROR',
        payload
    }
}

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
export const setTranslationLangs = () => {
    return {
        type: 'SET_TRANSLATION_LANGS',
        payload: {from: store.getState().fromLanguage, to: store.getState().toLanguage},
    }
}
export const translateCurrentWord = () => async (dispatch: ThunkDispatch<ReturnType<typeof appReducer>, void, AnyAction>) => {
    dispatch(setLoading(true));
    dispatch(setError(null));
    const { fromLanguage, toLanguage, currentInput } = store.getState();

    const response = await translateWord({key: YA_DICT_API_KEY, lang: `${fromLanguage}-${toLanguage}`, text: currentInput});

    if (response.def.length) {
        dispatch(setTranslation(response.def));
        dispatch(setPreviousWords({value: currentInput, from: fromLanguage, to: toLanguage}))
        dispatch(setTranslationLangs());
        dispatch(setLoading(false));
    }
    else {
        dispatch(setTranslation('Перевести слово невозможно'))
        dispatch(setLoading(false));
        dispatch(setError('Перевести слово невозможно'));
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

    const neededKey = Object.keys(uploadedLangs!).find(k =>  k.split('-')[0] === fromLanguage) as keyof typeof uploadedLangs;

    return {
        type: 'SET_TO_LANGS',
        payload: uploadedLangs![neededKey].map(l => l.split('-'))
    }
}
export const loadLanguages = () => async (dispatch: ThunkDispatch<ReturnType<typeof appReducer>, void, AnyAction>) => {
    dispatch(setLoading(true));
    dispatch(setError(null));
    getLangs()
        .then(res => {
            dispatch(setUploadedLangs(res));
            dispatch(setFromLangs());
            dispatch(setLoading(false));
        })
        .catch(() => {
            dispatch(setError('Возникла ошибка при загрузке доступных языков'));
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
export const swapLanguages = () => (dispatch: ThunkDispatch<ReturnType<typeof appReducer>, void, AnyAction>) => {
    const {toLanguage, fromLanguage} = store.getState();

    dispatch(setFromLanguage(toLanguage));
    dispatch(setToLangs(toLanguage));
    dispatch(setToLanguage(fromLanguage));
}

export const translateResultedWord = (wordToTranslate: string) => (dispatch: ThunkDispatch<ReturnType<typeof appReducer>, void, AnyAction>) => {
    const {translatedTo, translatedFrom} = store.getState();

    dispatch(setFromLanguage(translatedTo));
    dispatch(setToLangs(translatedTo));
    dispatch(setToLanguage(translatedFrom));

    dispatch(setCurrentInput(wordToTranslate));
    dispatch(translateCurrentWord());
}

const setPreviousWords = (payload: {value: string, from: string, to: string}) => {
    return {
        type: 'SET_PREVIOUS_WORDS',
        payload
    }
}
export const translatePreviousWord = (wordToTranslate: string, from: string, to: string) => (dispatch: ThunkDispatch<ReturnType<typeof appReducer>, void, AnyAction>) => {
    dispatch(setFromLanguage(from));
    dispatch(setToLangs(from));
    dispatch(setToLanguage(to));

    dispatch(setCurrentInput(wordToTranslate));
    dispatch(translateCurrentWord());
}