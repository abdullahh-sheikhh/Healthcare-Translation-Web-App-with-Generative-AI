'use client'; // This is a client component 👈🏽

import { useState, useEffect } from 'react';
import { FaMicrophone } from 'react-icons/fa';
import { getLanguages } from '../utils/get-languages';
import BouncingLoader from '../assets/BouncingLoader';
import axios from 'axios';

export default function VoiceToText({
    text,
    setText,
    inputLanguage,
    setInputLanguage,
    startOver,
}) {
    const [isRecording, setIsRecording] = useState(false);
    const [languages, setLanguages] = useState([]);
    const [hasRecorded, setHasRecorded] = useState(false);
    let SpeechRecognition = undefined;
    let recognition = undefined;

    useEffect(() => {
        if (languages.length === 0) setLanguages(getLanguages);
        SpeechRecognition =
            window.SpeechRecognition || window.webkitSpeechRecognition;
        recognition = new SpeechRecognition();
    });

    const toggleRecording = () => {
        if (isRecording === true) {
            setIsRecording(false);
            setHasRecorded(true);
            recognition?.stop();
            return;
        }

        recognition.lang = inputLanguage;
        recognition.interimResults = false;
        recognition.continuous = false;

        recognition.onstart = () => {
            setIsRecording(true);
        };

        recognition.onresult = (event) => {
            setText(event.results[0][0].transcript);
            setHasRecorded(true);
            setIsRecording(false);
        };

        recognition.start();
    };

    return (
        <div className='flex flex-col gap-5 items-center justify-center text-center'>
            <h2>
                {!hasRecorded
                    ? 'Please select a language and say something!'
                    : 'Great! Now please select a language to translate to!'}
            </h2>
            {!hasRecorded && (
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
            )}
            {hasRecorded && (
                <textarea
                    style={{ resize: 'none' }}
                    rows={10}
                    cols={40}
                    value={text}
                    readOnly
                />
            )}
            {hasRecorded && (
                <button
                    className='px-4 py-1 w-full rounded-md'
                    onClick={() => {
                        setHasRecorded(false);
                        startOver();
                    }}
                >
                    Record Again
                </button>
            )}
            {!hasRecorded && (
                <button
                    onClick={toggleRecording}
                    disabled={isRecording}
                    className='rounded-full bg-gray-300 p-2 flex items-center justify-center hover:bg-gray-400'
                    style={{
                        backgroundColor: isRecording ? 'red' : '',
                    }}
                >
                    <div
                        className='rounded-full bg-blue-500 p-10 hover:bg-blue-600'
                        style={{
                            backgroundColor: isRecording ? 'red' : '',
                        }}
                    >
                        {isRecording && (
                            <BouncingLoader className='w-10 h-10' />
                        )}
                        {!isRecording && <FaMicrophone className='w-8 h-8' />}
                    </div>
                </button>
            )}
        </div>
    );
}
