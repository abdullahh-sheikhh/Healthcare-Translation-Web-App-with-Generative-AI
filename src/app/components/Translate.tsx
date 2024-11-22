import { useState, useEffect } from 'react';
import { getLanguages, Language } from '@/app/utils/get-languages';

type TranslateProps = {
  outputLanguage: string;
  setOutputLanguage: React.Dispatch<React.SetStateAction<string>>;
  translate: () => void;
};

export default function Translate({
  outputLanguage,
  setOutputLanguage,
  translate,
}: TranslateProps) {
  const [languages, setLanguages] = useState([] as Language[]);

  useEffect(() => {
    if (languages.length === 0) setLanguages(getLanguages);
  });

  return (
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
      <button onClick={translate}>Translate</button>
    </div>
  );
}
