'use client'; // This is a client component 👈🏽

import { useEffect, useState } from 'react';
import VoiceToText from './components/VoiceToText';
import TextToSpeech from './components/TextToSpeech';
import { getLanguages, Language } from './utils/get-languages';

export default function Home() {
  const [languages, setLanguages] = useState([] as Language[]);
  const [outputLanguage, setOutputLanguage] = useState('en-US');

  useEffect(() => {
    if (languages.length === 0) setLanguages(getLanguages);
  });

  return (
    <div>
      <header className='p-10 flex flex-col gap-5 justify-center items-center'>
        <h1 className='text-2xl font-semibold text-gray-700'>
          Healthcare Translation Web App with Generative AI
        </h1>
        <p className='text-md font-light text-gray-800'>
          This is a web app that uses generative AI to translate healthcare
          data.
        </p>
      </header>

      <div className='flex gap-10 justify-evenly items-center mt-10'>
        <VoiceToText />

        <div className='mid-side flex flex-col gap-5'>
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
          <button>Translate</button>
        </div>

        <TextToSpeech />
      </div>
    </div>
  );
}
