import { returnLangsObject } from "../yaDict";
import { getNativeName } from 'all-iso-language-codes'

type ShortLangName = string;
type LongLangNativeName = string;

export async function getCountries(): Promise<[string, string][]> {
    const translatableLangsObj = await returnLangsObject();

    const outCountriesInfoArray: Array<[string, string]> = [];

    Object.keys(translatableLangsObj).forEach((lang: ShortLangName) => {
        const nativeName: LongLangNativeName | null = getNativeName(lang);

        if (nativeName) {
            outCountriesInfoArray.push([lang, nativeName])
        }
    })

    return outCountriesInfoArray;
}