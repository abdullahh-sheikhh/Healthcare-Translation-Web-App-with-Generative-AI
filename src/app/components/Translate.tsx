import { useState, useEffect } from 'react';
import { getLanguages, Language } from '@/app/utils/get-languages';
import ThreeDots from '@/app/assets/threeDots';

type TranslateProps = {
    outputLanguage: string;
    setOutputLanguage: React.Dispatch<React.SetStateAction<string>>;
    translate: () => Promise<void>;
};

export default function Translate({
    outputLanguage,
    setOutputLanguage,
    translate,
}: TranslateProps) {
    const [languages, setLanguages] = useState([] as Language[]);
    const [isTranslating, setIsTranslating] = useState(false);

    useEffect(() => {
        if (languages.length === 0) setLanguages(getLanguages);
    });

    async function translateWrapper() {
        setIsTranslating(true);
        await translate();
        setIsTranslating(false);
    }

    return (
        <div className='mid-side flex flex-col gap-5 mt-5 sm:mt-0'>
            <select
                onChange={(event) => {
                    setOutputLanguage(event.target.value);
                }}
                value={outputLanguage}
            >
                {languages.map((language) => (
                    <option key={language.code} value={language.code}>
                        {language.name} ({language.code})
                    </option>
                ))}
            </select>
            <button
                className='rounded-md text-center'
                onClick={translateWrapper}
                disabled={isTranslating}
                style={{
                    padding: isTranslating ? '' : '4px',
                }}
            >
                {isTranslating ? (
                    <ThreeDots className='w-9 mx-auto' />
                ) : (
                    'Translate'
                )}
            </button>
        </div>
    );
}
