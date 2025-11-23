import { NormalizedDeal } from "@/types";

export function normalizePrice(price: number, currency: string = "USD"): string {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: currency,
    }).format(price);
}

export function calculateValueScore(deal: NormalizedDeal): number {
    // This is a placeholder if we want to do pre-calculation during normalization
    // For now, the ranker handles the heavy lifting.
    return 0;
}

export function normalizeDeal(deal: any): NormalizedDeal {
    // In a real app, this would take raw API responses and map them to our schema.
    // Since we are using a MockAdapter that already returns NormalizedDeal, this is a pass-through.
    return deal as NormalizedDeal;
}
