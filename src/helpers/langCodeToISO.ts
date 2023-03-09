const fixBadLangBinary: {[key: string]: string} = {
    be: 'by',
    cs: 'cz',
    da: 'dk',
    el: 'gr',
    en: 'gb',
    et: 'ee',
    sv: 'se',
    uk: 'ua',
    zh: 'cn'
}

export function langCodeToISO(yandexLangCode: string): string {
    if (yandexLangCode in fixBadLangBinary) {
        return fixBadLangBinary[yandexLangCode];
    }

    return yandexLangCode
}