import { returnLangsObject } from "../yaDict";
import { getNativeName } from 'all-iso-language-codes'

type ShortLangName = string;
type LongLangNativeName = string;

export async function getLangs(): Promise<{[key: string]: string[]}> {
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