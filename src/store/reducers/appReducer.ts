import { getLangs } from "../../apis/countryName";

interface IAppReducer {
    currentWord: string,

    uploadedLangs: Awaited<ReturnType<typeof getLangs> | null>

    fromLangs: [string, string][] | null,
    toLangs: [string, string][] | null,

    fromLanguage: string,
    toLanguage: string,
}

type ActionType = {
    type: string,
    payload?: unknown
}

const initialAppState: IAppReducer = {
    currentWord: '',

    uploadedLangs: null,

    fromLangs: null,
    toLangs: null,

    fromLanguage: '',
    toLanguage: ''
}

export function appReducer(state: IAppReducer = initialAppState, action: ActionType) {
    switch (action.type) {
        case 'SET_CURRENT_WORD': 
            return {
                ...state,
                currentWord: typeof action.payload === 'string' ? action.payload : ''
            }
        default: 
            return state
    }
}