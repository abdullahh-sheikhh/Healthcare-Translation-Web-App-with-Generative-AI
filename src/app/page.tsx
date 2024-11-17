'use client'; // This is a client component 👈🏽

import { useState } from 'react';

export default function Home() {
  const [inputLangDrop, setInputLangDrop] = useState(false);
  const [outputLangDrop, setOutputLangDrop] = useState(false);

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
        <div className='left-side flex flex-col gap-5'>
          <h2>Input</h2>
          <select name='' id='' defaultValue={''}>
            <option value=''>Select Input Language</option>
            <option value='English'>English</option>
            <option value='French'>French</option>
            <option value='German'>German</option>
            <option value='Italian'>Italian</option>
            <option value='Russian'>Russian</option>
          </select>

          <textarea id='left-side' rows={10} cols={40}></textarea>
          <button>Speak</button>
        </div>

        <div className='mid-side flex flex-col gap-5'>
          <select name='' id='' defaultValue={''}>
            <option value=''>Select Input Language</option>
            <option value='English'>English</option>
            <option value='French'>French</option>
            <option value='German'>German</option>
            <option value='Italian'>Italian</option>
            <option value='Russian'>Russian</option>
          </select>
          <button>Translate</button>
        </div>

        <div className='right-side flex flex-col gap-5'>
          <h2>Output</h2>

          <textarea id='right-side' rows={10} cols={40}></textarea>
          <button>Speak</button>
        </div>
      </div>
    </div>
  );
}
