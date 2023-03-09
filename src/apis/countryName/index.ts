import { returnLangsObject } from "../yaDict";
import { getNativeName } from 'all-iso-language-codes'

type ShortLangName = string;
type LongLangNativeName = string;

type StringDuoTuple = [string, string];

export async function getLangs(): Promise<typeof countriesMap> {
    const translatableLangsObj = await returnLangsObject();

    // const outCountriesInfoArray: Array<[string, string]> = [];
    const countriesMap: Map<StringDuoTuple, StringDuoTuple[]> = new Map();

    Object.keys(translatableLangsObj).forEach((lang: ShortLangName) => {
        const langNativeName: LongLangNativeName | null = getNativeName(lang);

        if (langNativeName) {
            const langTuple: StringDuoTuple = [lang, langNativeName];
            countriesMap.set(langTuple, []);
    
            translatableLangsObj[lang].forEach((sublang: ShortLangName) => {
                const sublangNativeName: LongLangNativeName | null = getNativeName(sublang);

                if (sublangNativeName) {
                    const sublangTuple: StringDuoTuple = [sublang, sublangNativeName];

                    countriesMap.set(langTuple, [...countriesMap.get(langTuple)!, sublangTuple])
                }

            }) 
        }
    })

    return countriesMap;
}