import { NormalizedDeal } from "@/types";

export function calculateScore(deal: NormalizedDeal): number {
    // Formula: score = - (totalPrice) + (rating * 20) + (log(reviewCount + 1) * 5) - penaltyForUsed
    // Adjusted weights for better balance:
    // - Price is negative (lower is better)
    // - Rating is boosted (4.5 -> 90 points)
    // - Review count is logarithmic to prevent massive counts from dominating

    let score = -deal.totalPrice;

    if (deal.rating) {
        score += deal.rating * 20;
    }

    if (deal.reviewCount) {
        score += Math.log(deal.reviewCount + 1) * 5;
    }

    if (deal.condition === 'used') {
        score -= 50;
    } else if (deal.condition === 'refurbished') {
        score -= 25;
    }

    return score;
}

export function rankDeals(deals: NormalizedDeal[]): NormalizedDeal[] {
    return deals.sort((a, b) => calculateScore(b) - calculateScore(a));
}
