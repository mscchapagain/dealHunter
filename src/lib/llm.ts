import OpenAI from 'openai';
import { NormalizedQuery, NormalizedDeal } from '@/types';

// Initialize OpenAI client
// Note: In a real app, you should handle the case where the key is missing gracefully
const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY || 'dummy-key',
    baseURL: "https://openrouter.ai/api/v1",
    dangerouslyAllowBrowser: true,
    defaultHeaders: {
        "HTTP-Referer": "http://localhost:3000", // Optional, for including your app on openrouter.ai rankings.
        "X-Title": "DealHunter AI", // Optional. Shows in rankings on openrouter.ai.
    }
});

export async function parseQuery(userInput: string): Promise<NormalizedQuery> {
    if (!process.env.OPENAI_API_KEY) {
        console.warn("No OpenAI API Key found. Returning mock query.");
        return {
            productName: userInput,
            notes: "Mock parsed query due to missing API key"
        };
    }

    try {
        const response = await openai.chat.completions.create({
            model: "gpt-4o",
            messages: [
                {
                    role: "system",
                    content: `You are a helpful shopping assistant. Extract search parameters from the user's query.
          Output JSON only matching this schema:
          {
            "productName": "string",
            "category": "string (optional)",
            "maxPrice": number (optional),
            "minRating": number (optional),
            "preferredSources": ["string"] (optional),
            "notes": "string (optional)"
          }`
                },
                { role: "user", content: userInput }
            ],
            response_format: { type: "json_object" }
        });

        const content = response.choices[0].message.content;
        if (!content) throw new Error("No content from LLM");

        return JSON.parse(content) as NormalizedQuery;
    } catch (error) {
        console.error("LLM Parse Error:", error);
        // Fallback to simple object
        return { productName: userInput };
    }
}

export async function generateExplanation(query: string, deals: NormalizedDeal[]): Promise<string> {
    if (!process.env.OPENAI_API_KEY) {
        return "Here are the best deals I found based on your search. (LLM explanation unavailable without API key)";
    }

    try {
        const dealsSummary = deals.slice(0, 5).map(d =>
            `- ${d.title}: ${d.currency} ${d.totalPrice} (${d.condition}, ${d.rating} stars)`
        ).join("\n");

        const response = await openai.chat.completions.create({
            model: "gpt-4o",
            messages: [
                {
                    role: "system",
                    content: "You are a shopping assistant. Briefly explain why these deals are the best matches for the user's query. Highlight the best value, cheapest, and highest rated options. Keep it under 3 sentences."
                },
                {
                    role: "user",
                    content: `Query: ${query}\n\nDeals:\n${dealsSummary}`
                }
            ]
        });

        return response.choices[0].message.content || "Here are the top deals.";
    } catch (error) {
        console.error("LLM Explain Error:", error);
        return "Here are the top deals I found for you.";
    }
}
