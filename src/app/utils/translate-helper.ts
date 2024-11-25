import axios from 'axios';

export const callAITranslatorApi = async (
    text: string,
    targetLanguage: string
): Promise<string> => {
    try {
        const grocApiKey = await axios
            .get('/api/')
            .then((res) => res.data.grocApiKey);
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
                        content: `You are a healthcare translator. Translate the given text into ${targetLanguage}. Pay special attention to medical words. Just provide the accurate translated text and nothing else at all.`,
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
        return 'Error: Translation failed!';
    }
};
