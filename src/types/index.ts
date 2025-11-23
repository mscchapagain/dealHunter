export interface NormalizedQuery {
  productName: string;
  category?: string;
  maxPrice?: number;
  minRating?: number;
  preferredSources?: string[];
  notes?: string;
}

export interface NormalizedDeal {
  id: string;
  source: string;
  title: string;
  url: string;
  imageUrl?: string;
  price: number;
  currency: string;
  shippingCost?: number;
  totalPrice: number;
  rating?: number;
  reviewCount?: number;
  condition?: "new" | "used" | "refurbished";
  description?: string;
}

export interface DealSource {
  name: string;
  search(query: NormalizedQuery): Promise<NormalizedDeal[]>;
}
