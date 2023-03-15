import { getLangs } from "../../apis/countryName";

export interface IAppReducer {
    currentInput: string,
    translation: Array<DefinitonObject> | string | null,

    uploadedLangs: Awaited<ReturnType<typeof getLangs> | null>

    fromLangs: [string, string][] | null,
    toLangs: [string, string][] | null,

    fromLanguage: string,
    toLanguage: string,
}

type DefinitonObject = {
    text: string,
    pos: string,
    ts: string,
    tr: Array<TranslationObject>
}
type TranslationObject = {
    text: string,
    pos: string,
    gen: string,
    fr: number,
    syn: Omit<TranslationObject, 'syn' | 'mean'>,
    mean: Array<{text: string}>
}

type ActionType = {
    type: string,
    payload?: unknown
}

const initialAppState: IAppReducer = {
    currentInput: '',
    translation: null,

    uploadedLangs: null,

    fromLangs: null,
    toLangs: null,

    fromLanguage: '',
    toLanguage: ''
}

export function appReducer(state: IAppReducer = initialAppState, action: ActionType) {
    switch (action.type) {
        case 'SET_CURRENT_INPUT': 
            return {
                ...state,
                currentInput: action.payload as string
            }
        case 'SET_TRANSLATION': 
            return {
                ...state,
                translation: action.payload as IAppReducer['translation']
            }
        case 'SET_UPLOADED_LANGS': 
            return {
                ...state,
                uploadedLangs: action.payload as Awaited<ReturnType<typeof getLangs> | null>
            }
        case 'SET_FROM_LANGS':
            return {
                ...state,
                fromLangs: action.payload as [string, string][] | null
            }
        case 'SET_TO_LANGS':
            return {
                ...state,
                toLangs: action.payload as [string, string][] | null
            }
        case 'SET_FROM_LANGUAGE': 
            return {
                ...state,
                fromLanguage: action.payload as string
            }
        case 'SET_TO_LANGUAGE': 
            return {
                ...state,
                toLanguage: action.payload as string
            }

        default: 
            return state
    }
}