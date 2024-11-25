import { useState } from 'react';

export default function TextToSpeech({
    text,
    setText,
    outputLanguage,
}: {
    text: string;
    setText: React.Dispatch<React.SetStateAction<string>>;
    outputLanguage: string;
}) {
    const [isSpeaking, setIsSpeaking] = useState(false);

    const toggleSpeak = () => {
        if (!text) {
            alert('Please enter some text to speak!');
            return;
        }

        if (isSpeaking === true) {
            setIsSpeaking(false);
            window.speechSynthesis.cancel();
            return;
        }

        const utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = outputLanguage;
        utterance.rate = 1;
        utterance.pitch = 1;

        utterance.onstart = () => {
            setIsSpeaking(true);
        };

        utterance.onend = () => {
            setIsSpeaking(false);
        };

        window.speechSynthesis.speak(utterance);
    };

    return (
        <div className='flex flex-col gap-5 mt-5 sm:mt-0'>
            <h2>Output</h2>
            <textarea
                style={{ resize: 'none' }}
                rows={10}
                cols={40}
                placeholder='Type something to speak...'
                value={text}
                onChange={(e) => setText(e.target.value)}
            ></textarea>
            <button
                className='px-4 py-1 rounded-md'
                onClick={toggleSpeak}
                style={{
                    backgroundColor: isSpeaking ? 'red' : '',
                }}
            >
                {isSpeaking ? 'Stop' : 'Speak'}
            </button>
        </div>
    );
}
