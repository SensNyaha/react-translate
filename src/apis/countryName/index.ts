import { returnLangsObject } from "../yaDict";
import { getNativeName } from 'all-iso-language-codes';

import { store } from "../../store";
import { setError } from '../../store/actions/appActions';

type ShortLangName = string;
type LongLangNativeName = string;

export async function getLangs(): Promise<{[key: string]: string[]}> {
    try {
        const translatableLangsObj = await returnLangsObject();

        const countriesObject: {[key: string]: string[]} = {};
    
        Object.keys(translatableLangsObj).forEach((lang: ShortLangName) => {
            const langNativeName: LongLangNativeName | null = getNativeName(lang);
    
            if (langNativeName) {
                const langPair: string = `${lang}-${langNativeName}`;
                countriesObject[langPair] = [];
        
                translatableLangsObj[lang].forEach((sublang: ShortLangName) => {
                    const sublangNativeName: LongLangNativeName | null = getNativeName(sublang);
    
                    if (sublangNativeName) {
                        const sublangPair: string = `${sublang}-${sublangNativeName}`;
    
                        countriesObject[langPair] = [...countriesObject[langPair], sublangPair]
                    }
                }) 
            }
        })
        return countriesObject;
    }
    catch (e) {
        store.dispatch(setError((e as Error).stack || (e as Error).message))
        return {}
    }
}