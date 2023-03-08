import { returnLangsObject } from "../yaDict";
import { getNativeName } from 'all-iso-language-codes'


export async function getCountries() {
    const translatableLangsObj = await returnLangsObject();

    const outCountriesInfoArray: Array<Array<string>> = [];

    Object.keys(translatableLangsObj).forEach(lang => {
        const nativeName = getNativeName(lang);

        if (nativeName) {
            outCountriesInfoArray.push([lang, nativeName])
        }
    })

    return outCountriesInfoArray;
}