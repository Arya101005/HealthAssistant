import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function handleChatRequest(message: string) {
  try {
    const completion = await openai.chat.completions.create({
      model: 'gpt-4',
      messages: [
        {
          role: 'system',
          content: 'You are a knowledgeable health assistant. Provide accurate, helpful, and concise responses to health-related questions. Always encourage users to consult healthcare professionals for specific medical advice.',
        },
        {
          role: 'user',
          content: message,
        },
      ],
      temperature: 0.7,
      max_tokens: 500,
    });

    return {
      response: completion.choices[0].message.content,
    };
  } catch (error) {
    console.error('OpenAI API Error:', error);
    throw new Error('Failed to get response from health assistant');
  }
} 