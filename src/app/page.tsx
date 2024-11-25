'use client'; // This is a client component 👈🏽

import { useState } from 'react';
import Header from './components/Header';
import Translate from './components/Translate';
import VoiceToText from './components/VoiceToText';
import TextToSpeech from './components/TextToSpeech';
import { callAITranslatorApi } from './utils/translate-helper';

export default function Home() {
    const [inputText, setInputText] = useState('');
    const [inputLanguage, setInputLanguage] = useState('en-US');
    const [outputText, setOutputText] = useState('');
    const [outputLanguage, setOutputLanguage] = useState('en-US');

    const translate = async () => {
        const translatedText = await callAITranslatorApi(
            inputText,
            outputLanguage
        );
        setOutputText(translatedText);
        setTimeout(() => {
            window.scrollTo(0, document.body.scrollHeight);
        }, 100);
    };

    const startOver = () => {
        setInputText('');
        setOutputText('');
        setInputLanguage('en-US');
        setOutputLanguage('en-US');
    };

    return (
        <div className='h-screen overflow-auto'>
            <Header />
            <div className='sm:flex gap-10 p-2 justify-evenly items-center mt-5 sm:mt-10'>
                <VoiceToText
                    text={inputText}
                    setText={setInputText}
                    inputLanguage={inputLanguage}
                    setInputLanguage={setInputLanguage}
                    startOver={startOver}
                />

                {inputText && !outputText && (
                    <Translate
                        translate={translate}
                        outputLanguage={outputLanguage}
                        setOutputLanguage={setOutputLanguage}
                    />
                )}

                {outputText && (
                    <TextToSpeech
                        text={outputText}
                        setText={setOutputText}
                        outputLanguage={outputLanguage}
                    />
                )}
            </div>
        </div>
    );
}
