import { useState } from 'react';

export default function TextToSpeech() {
    const [text, setText] = useState('');
    const [isSpeaking, setIsSpeaking] = useState(false);

    const toggleSpeak = () => {
        if (!text) {
            alert('Please enter some text to speak!');
            return;
        }

        if (isSpeaking === true) {
            setIsSpeaking(false);
            window.speechSynthesis.cancel();
            console.log('ddd');
            return;
        }

        const utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = 'en-US';
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
        <div className='right-side flex flex-col gap-5'>
            <h2>Output</h2>
            <textarea
                id='right-side'
                rows={10}
                cols={40}
                placeholder='Type something to speak...'
                value={text}
                onChange={(e) => setText(e.target.value)}
            ></textarea>
            <button
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
