const API_KEY = '9741accfe6c84e9f88ed3fec756ace46';


const arrayYandexLangsToVoiceRSSLangs: [string, string][] = [
    [
        'bg', 'bg-bg'
    ],
    [
        'zh', 'zh-cn'
    ],
    [
        'cs', 'cs-cz'
    ],
    [
        'da', 'da-dk'
    ],
    [
        'en', 'en-gb'
    ],
    [
        'fi', 'fi-fi'
    ],
    [
        'fr', 'fr-fr'
    ],
    [
        'de', 'de-de'
    ],
    [
        'el', 'el-gr'
    ],
    [
        'hu', 'hu-hu'
    ],
    [
        'it', 'it-it'
    ],
    [
        'no', 'nb-no'
    ],
    [
        'pl', 'pl-pl'
    ],
    [
        'pt', 'pt-pt'
    ],
    [
        'sk', 'sk-sk'
    ],
    [
        'es', 'es-es'
    ],
    [
        'ru', 'ru-ru'
    ],
    [
        'sv', 'sv-se'
    ],
    [
        'tr', 'tr-tr'
    ]
]

export function transpileYandexLangsToVoiceRSSLangs (yandexLangName: string) {
    const foundPair = arrayYandexLangsToVoiceRSSLangs.find(tuple => tuple[0] === yandexLangName);

    if (foundPair) {
        return foundPair[1]
    }
    return null
}

export async function makeRequestToVoiceRSSAndPlay (wordToSpeech: string, yandexTypedLang: string) {
    try {
        const ctx = new AudioContext();
    
        const response = await fetch(`http://api.voicerss.org/?key=${API_KEY}&hl=${transpileYandexLangsToVoiceRSSLangs(yandexTypedLang)}&c=MP3&f=48khz_16bit_stereo&src=${wordToSpeech}`);

        const arrayBuffer = await response.arrayBuffer();

        const audio = await ctx.decodeAudioData(arrayBuffer);

        const playSound = ctx.createBufferSource();
        playSound.buffer = audio;
        playSound.connect(ctx.destination);
        playSound.start(ctx.currentTime);
    }
    catch (e) {
        alert('Что-то пошло не так, ошибка: ' + (e as Error).message);
    }
}