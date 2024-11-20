'use client'; // This is a client component 👈🏽

import { useEffect, useState } from 'react';
import VoiceToText from './components/VoiceToText';
import TextToSpeech from './components/TextToSpeech';
import Translate from './components/Translate';
import { useAITranslatorApi } from './utils/translate-helper';

export default function Home() {
    const [inputText, setInputText] = useState('');
    const [inputLanguage, setInputLanguage] = useState('en-US');
    const [outputText, setOutputText] = useState('');
    const [outputLanguage, setOutputLanguage] = useState('en-US');

    const translate = async () => {
        const translatedText = await useAITranslatorApi(
            inputText,
            outputLanguage
        );
        setOutputText(translatedText);
    };

    return (
        <div>
            <header className='p-10 flex flex-col gap-5 justify-center items-center'>
                <h1 className='text-2xl font-semibold text-gray-700'>
                    Healthcare Translation Web App with Generative AI
                </h1>
                <p className='text-md font-light text-gray-800'>
                    This is a web app that uses generative AI to translate
                    healthcare data.
                </p>
            </header>

            <div className='flex gap-10 justify-evenly items-center mt-10'>
                <VoiceToText
                    text={inputText}
                    setText={setInputText}
                    inputLanguage={inputLanguage}
                    setInputLanguage={setInputLanguage}
                />

                <Translate
                    translate={translate}
                    outputLanguage={outputLanguage}
                    setOutputLanguage={setOutputLanguage}
                />

                <TextToSpeech
                    text={outputText}
                    setText={setOutputText}
                    outputLanguage={outputLanguage}
                />
            </div>
        </div>
    );
}
