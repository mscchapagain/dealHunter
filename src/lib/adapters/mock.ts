import { DealSource, NormalizedDeal, NormalizedQuery } from "@/types";

export class MockAdapter implements DealSource {
    name = "MockStore";

    async search(query: NormalizedQuery): Promise<NormalizedDeal[]> {
        // Simulate network delay
        await new Promise((resolve) => setTimeout(resolve, 800));

        const deals: NormalizedDeal[] = [
            {
                id: "mock-1",
                source: "MockStore",
                title: `${query.productName} - Standard Edition`,
                url: "https://example.com/product/1",
                imageUrl: "https://placehold.co/400x400?text=Product+Image",
                price: 299.99,
                currency: "USD",
                shippingCost: 0,
                totalPrice: 299.99,
                rating: 4.5,
                reviewCount: 120,
                condition: "new",
                description: "A great standard edition of the product you are looking for.",
            },
            {
                id: "mock-2",
                source: "BestDeals",
                title: `${query.productName} - Pro Bundle`,
                url: "https://example.com/product/2",
                imageUrl: "https://placehold.co/400x400?text=Pro+Bundle",
                price: 350.00,
                currency: "USD",
                shippingCost: 10,
                totalPrice: 360.00,
                rating: 4.8,
                reviewCount: 85,
                condition: "new",
                description: "Includes extra accessories and extended warranty.",
            },
            {
                id: "mock-3",
                source: "DiscountBin",
                title: `Refurbished ${query.productName}`,
                url: "https://example.com/product/3",
                imageUrl: "https://placehold.co/400x400?text=Refurbished",
                price: 199.99,
                currency: "USD",
                shippingCost: 15,
                totalPrice: 214.99,
                rating: 3.8,
                reviewCount: 40,
                condition: "refurbished",
                description: "Certified refurbished with minor cosmetic imperfections.",
            },
            {
                id: "mock-4",
                source: "Amazonia",
                title: `${query.productName} (Used - Good)`,
                url: "https://example.com/product/4",
                imageUrl: "https://placehold.co/400x400?text=Used",
                price: 150.00,
                currency: "USD",
                shippingCost: 5,
                totalPrice: 155.00,
                rating: 4.0,
                reviewCount: 200,
                condition: "used",
                description: "Used item in good condition. Original packaging may be missing.",
            },
            {
                id: "mock-5",
                source: "TechGiant",
                title: `${query.productName} - Latest Model`,
                url: "https://example.com/product/5",
                imageUrl: "https://placehold.co/400x400?text=Latest+Model",
                price: 320.00,
                currency: "USD",
                shippingCost: 0,
                totalPrice: 320.00,
                rating: 4.9,
                reviewCount: 1500,
                condition: "new",
                description: "The latest and greatest model with all new features.",
            }
        ];

        // Simple client-side filtering based on query constraints
        return deals.filter(deal => {
            if (query.maxPrice && deal.totalPrice > query.maxPrice) return false;
            if (query.minRating && (deal.rating || 0) < query.minRating) return false;
            return true;
        });
    }
}
