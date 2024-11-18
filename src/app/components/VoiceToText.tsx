import { useState, useEffect } from 'react';
import { getLanguages, Language } from '../utils/get-languages';

export default function VoiceToText() {
    const [text, setText] = useState('');
    const [isRecording, setIsRecording] = useState(false);
    const [languages, setLanguages] = useState([] as Language[]);
    const [inputLanguage, setInputLanguage] = useState('en-US');

    useEffect(() => {
        if (languages.length === 0) setLanguages(getLanguages);
    });

    const SpeechRecognition =
        (window as any).SpeechRecognition ||
        (window as any).webkitSpeechRecognition;
    let recognition = new SpeechRecognition();

    const toggleRecording = () => {
        if (isRecording === true) {
            setIsRecording(false);
            recognition?.stop();
            return;
        }

        recognition.lang = inputLanguage;
        recognition.interimResults = false;
        recognition.continuous = false;

        recognition.onstart = () => {
            setIsRecording(true);
        };

        recognition.onresult = (event: any) => {
            setText(event.results[0][0].transcript);
        };

        recognition.start();
    };

    return (
        <div className='flex flex-col gap-5'>
            <h2>Input</h2>
            <select
                onChange={(event) => {
                    setInputLanguage(event.target.value);
                }}
            >
                {languages.map((language) => (
                    <option key={language.code} value={language.code}>
                        {language.name} ({language.code})
                    </option>
                ))}
            </select>
            <textarea rows={10} cols={40} value={text || 'Speak something!'} />
            <button
                onClick={toggleRecording}
                style={{
                    backgroundColor: isRecording ? 'red' : '',
                }}
            >
                {!isRecording ? 'Record' : 'Stop'}
            </button>
        </div>
    );
}
