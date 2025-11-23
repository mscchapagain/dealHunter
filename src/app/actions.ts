'use server';

import { AdapterFactory } from '@/lib/adapters/factory';
import { parseQuery, generateExplanation } from '@/lib/llm';
import { rankDeals } from '@/lib/ranker';
import { NormalizedDeal } from '@/types';

export async function searchDeals(userInput: string): Promise<{
    summary: string;
    deals: NormalizedDeal[];
}> {
    try {
        // 1. Parse User Query
        const query = await parseQuery(userInput);
        console.log("Parsed Query:", query);

        // 2. Fetch Deals from all adapters
        const adapters = AdapterFactory.getAdapters();
        const dealPromises = adapters.map(adapter => adapter.search(query));
        const results = await Promise.all(dealPromises);

        // Flatten results
        let allDeals = results.flat();

        // 3. Rank Deals
        const rankedDeals = rankDeals(allDeals);

        // Take top 5
        const topDeals = rankedDeals.slice(0, 5);

        // 4. Generate Explanation
        const summary = await generateExplanation(userInput, topDeals);

        return {
            summary,
            deals: topDeals
        };
    } catch (error) {
        console.error("Search Error:", error);
        throw new Error("Failed to search deals");
    }
}
