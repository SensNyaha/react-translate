const YA_DICT_API_KEY = 'dict.1.1.20230308T043857Z.9a25c35ec85fb94d.85a694ed7c4e57c2dfef5ee95d9bb5358ab31bff';

type TranslateWordArgsType = {
    key: typeof YA_DICT_API_KEY,
    lang: string,
    text: string,
}

type TranslateWordArgsResponse = {
    def: {
        text: string,
        pos: string,
        ts: string,
        tr: {
            text: string,
            fr: number,
            mean: Array<{text: string}>
        }
    }
}

export async function translateWord(configObj: TranslateWordArgsType): Promise<TranslateWordArgsResponse> {
    const first = await fetch(`https://dictionary.yandex.net/api/v1/dicservice.json/lookup?key=${configObj.key}&lang=${configObj.lang}&text=${configObj.text}`)
    const jsoned = await first.json() as TranslateWordArgsResponse;

    return jsoned;
}