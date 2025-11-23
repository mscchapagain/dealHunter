import { NormalizedDeal } from '@/types';
import { DealCard } from './DealCard';

interface DealListProps {
    deals: NormalizedDeal[];
}

export function DealList({ deals }: DealListProps) {
    if (deals.length === 0) return null;

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
            {deals.map((deal) => (
                <DealCard key={deal.id} deal={deal} />
            ))}
        </div>
    );
}
