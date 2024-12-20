export type Language = {
    code: string;
    name: string;
};

export const getLanguages = (): Language[] => {
    const voices = window.speechSynthesis.getVoices();
    const uniqueLanguages = Array.from(
        new Set(voices.map((voice) => voice.lang))
    ).map((lang) => {
        const name =
            new Intl.DisplayNames(['en'], { type: 'language' }).of(lang) ||
            lang;
        return { code: lang, name };
    });

    return uniqueLanguages;
};
