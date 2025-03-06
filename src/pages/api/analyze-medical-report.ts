import { NextApiRequest, NextApiResponse } from 'next';
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

interface AnalysisResult {
  type: 'condition' | 'medication' | 'measurement' | 'recommendation';
  value: string;
  confidence: number;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { text } = req.body;

    if (!text) {
      return res.status(400).json({ error: 'Text is required' });
    }

    // Use OpenAI to analyze the medical report text
    const completion = await openai.chat.completions.create({
      model: 'gpt-4',
      messages: [
        {
          role: 'system',
          content: `You are a medical report analyzer. Extract and categorize key information from medical reports into the following categories:
            - conditions (medical conditions or diagnoses)
            - medications (prescribed medications or treatments)
            - measurements (vital signs, lab results, or other numerical measurements)
            - recommendations (doctor's recommendations or follow-up instructions)
            
            Format each finding as an object with type, value, and confidence (0-1).`,
        },
        {
          role: 'user',
          content: text,
        },
      ],
      temperature: 0.3,
      max_tokens: 1000,
    });

    const analysisText = completion.choices[0].message.content;
    let results: AnalysisResult[] = [];

    try {
      // Parse the GPT response into structured data
      const parsedResults = JSON.parse(analysisText || '[]');
      if (Array.isArray(parsedResults)) {
        results = parsedResults;
      }
    } catch (error) {
      console.error('Error parsing GPT response:', error);
      // If parsing fails, try to extract information using regex
      const lines = analysisText?.split('\n') || [];
      results = lines
        .map((line) => {
          const match = line.match(/^(condition|medication|measurement|recommendation):\s*(.+)\s*\(confidence:\s*([\d.]+)\)$/i);
          if (match) {
            return {
              type: match[1].toLowerCase() as AnalysisResult['type'],
              value: match[2].trim(),
              confidence: parseFloat(match[3]),
            };
          }
          return null;
        })
        .filter((result): result is AnalysisResult => result !== null);
    }

    return res.status(200).json({ results });
  } catch (error) {
    console.error('Analysis API Error:', error);
    return res.status(500).json({ error: 'Failed to analyze medical report' });
  }
} 