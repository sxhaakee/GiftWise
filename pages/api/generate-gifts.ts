import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const { userProfile, quizAnswers, budget } = req.body
  // Log the incoming payload
  console.log('API payload:', { userProfile, quizAnswers, budget });
  if (!userProfile || !budget) {
    return res.status(400).json({ error: 'Missing required fields' })
  }

  // Improved prompt for better LLM results
  const prompt = `You are a creative gift recommendation assistant.\n\nGiven the following recipient information, suggest 6 unique, thoughtful, and diverse gift ideas.\nEach gift must:\n- Fit the recipient's interests, personality, and occasion.\n- Be within the specified budget.\n- Be from a different category (e.g., tech, experience, personalized, wellness, etc.).\n- Be creative and not generic.\n- Include a short, compelling reason for the choice.\n\nRespond ONLY with a JSON array in this format:\n[\n  {\n    "name": "Gift Name",\n    "price": 45,\n    "description": "Short description of the gift.",\n    "reason": "Why this is a great fit for the recipient.",\n    "category": "Category",\n    "tags": ["tag1", "tag2", "tag3"]\n  },\n  ...\n]\n\nExample input:\nRecipient: Sarah\nAge: 25\nGender: Female\nRelationship: Friend\nHobbies: Music, Art\nOccasion: Birthday\nPersonality: Creative\nInterests: Music, Art\nGift Style: Unique\nBudget: $20 - $50\n\nExample output:\n[\n  {\n    "name": "Custom Song Portrait",\n    "price": 40,\n    "description": "A digital portrait of Sarah created by an artist, inspired by her favorite song.",\n    "reason": "Combines her love for music and art in a personalized way.",\n    "category": "Personalized Art",\n    "tags": ["music", "art", "personalized"]\n  }\n]\n\nNow, here is the recipient:\nRecipient: ${userProfile.recipientName || 'Unknown'}\nAge: ${userProfile.age}\nGender: ${userProfile.gender}\nRelationship: ${userProfile.relationship}\nHobbies: ${(userProfile.hobbies || []).join(', ') || 'None'}\nOccasion: ${userProfile.occasion}\nPersonality: ${quizAnswers?.personality || 'Unknown'}\nInterests: ${(quizAnswers?.interests || []).join(', ') || 'None'}\nGift Style: ${quizAnswers?.giftStyle || 'Any'}\nBudget: $${budget.min} - $${budget.max}`

  try {
    const apiKey = process.env.OPENAI_API_KEY
    if (!apiKey) {
      return res.status(500).json({ error: 'OpenAI API key not set in environment' })
    }
    const response = await fetch('https://api.aimlapi.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: 'google/gemma-3n-e4b-it',
        messages: [
          { role: 'system', content: 'You are a helpful gift recommendation assistant.' },
          { role: 'user', content: prompt },
        ],
        temperature: 1.0,
        max_tokens: 900,
      }),
    })
    const data = await response.json()
    // Log the full OpenAI API response
    console.log('OpenAI API response:', data);
    const text = data.choices?.[0]?.message?.content
    if (!text) {
      console.error('No content in OpenAI response:', data);
      return res.status(500).json({ error: 'No content in OpenAI response', details: data })
    }
    // Try to parse the JSON array from the LLM response
    let gifts = []
    try {
      gifts = JSON.parse(text)
    } catch (e) {
      // fallback: try to extract JSON from text
      const match = text.match(/\[.*\]/s)
      if (match) {
        gifts = JSON.parse(match[0])
      }
    }
    return res.status(200).json({ recommendations: gifts })
  } catch (error) {
    console.error('Gift API error:', error);
    return res.status(500).json({ error: 'Failed to generate recommendations', details: error })
  }
} 