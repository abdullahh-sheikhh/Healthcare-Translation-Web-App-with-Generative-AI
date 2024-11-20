import axios from 'axios';

export const useAITranslatorApi = async (
    text: string,
    targetLanguage: string
): Promise<string> => {
    try {
        const grocApiKey =
            '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';
        const headers = {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${grocApiKey}`,
        };
        const response = await axios.post(
            'https://api.groq.com/openai/v1/chat/completions',
            {
                model: 'llama3-8b-8192',
                messages: [
                    {
                        role: 'system',
                        content: `Translate the given text into ${targetLanguage}. Pay special attention to medical words. User will now only input text to e translated, just reply with accurate translation.`,
                    },
                    {
                        role: 'user',
                        content: text,
                    },
                ],
            },
            { headers }
        );
        return response.data.choices[0].message.content;
    } catch (error) {
        console.error('Error:', error);
        return '';
    }
};
