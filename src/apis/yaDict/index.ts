export const YA_DICT_API_KEY = 'dict.1.1.20230308T043857Z.9a25c35ec85fb94d.85a694ed7c4e57c2dfef5ee95d9bb5358ab31bff';

type TranslateWordArgsType = {
    key: typeof YA_DICT_API_KEY,
    lang: string,
    text: string,
}
async function loadAvailableLangs(apiKey: typeof YA_DICT_API_KEY): Promise<Array<string>> {
    const first = await fetch(`https://dictionary.yandex.net/api/v1/dicservice.json/getLangs?key=${apiKey}`)
    const jsoned = await first.json();

    return jsoned;
}

type LanguageCanBeTranslatedToObj = {
    [key: string]: Array<string>
}
export async function returnLangsObject(): Promise<LanguageCanBeTranslatedToObj> {
    const array: string[] = await loadAvailableLangs(YA_DICT_API_KEY);
    const langObject: LanguageCanBeTranslatedToObj = {};

    array.forEach((langPair) => {
        const [left, right, ...rest] = langPair.split('-');

        if (left !== right && left.length <= 2 && right.length <= 2 && rest.length === 0) {
            if (langObject[left]) {
                langObject[left] = [...langObject[left], right];
            }
            else {
                langObject[left] = [right];
            }
        }
    })

    return langObject;
}

type TranslationWordObj = {
    text: string,
    fr: number,
    syn: Array<Omit<TranslationWordObj, 'syn' | 'mean'>>,
    mean: Array<Pick<TranslationWordObj, 'text'>>
}
type DefinitionWordObj = {
    text: string,
    pos: string,
    ts: string,
    tr: Array<TranslationWordObj>
}
type TranslateWordArgsResponse = {
    def: Array<DefinitionWordObj> | [];
}
export async function translateWord(configObj: TranslateWordArgsType): Promise<TranslateWordArgsResponse> {
    const first = await fetch(`https://dictionary.yandex.net/api/v1/dicservice.json/lookup?key=${configObj.key}&lang=${configObj.lang}&text=${configObj.text}`)
    const jsoned: TranslateWordArgsResponse = await first.json();

    return jsoned;
}