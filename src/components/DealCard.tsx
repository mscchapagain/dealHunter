import { NormalizedDeal } from '@/types';
import { Star, ExternalLink } from 'lucide-react';
import Image from 'next/image';

interface DealCardProps {
    deal: NormalizedDeal;
}

export function DealCard({ deal }: DealCardProps) {
    return (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow flex flex-col h-full">
            <div className="relative h-48 w-full bg-gray-50">
                {deal.imageUrl ? (
                    <Image
                        src={deal.imageUrl}
                        alt={deal.title}
                        fill
                        className="object-contain p-4"
                        unoptimized // For placeholder images
                    />
                ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-400">
                        No Image
                    </div>
                )}
                {deal.condition && deal.condition !== 'new' && (
                    <span className="absolute top-2 right-2 px-2 py-1 bg-yellow-100 text-yellow-800 text-xs font-medium rounded-full capitalize">
                        {deal.condition}
                    </span>
                )}
            </div>

            <div className="p-4 flex-1 flex flex-col">
                <div className="flex items-start justify-between mb-2">
                    <span className="text-xs font-semibold text-blue-600 uppercase tracking-wider">
                        {deal.source}
                    </span>
                    {deal.rating && (
                        <div className="flex items-center text-yellow-500 text-sm">
                            <Star className="w-4 h-4 fill-current" />
                            <span className="ml-1 text-gray-700 font-medium">{deal.rating}</span>
                            <span className="ml-1 text-gray-400 text-xs">({deal.reviewCount})</span>
                        </div>
                    )}
                </div>

                <h3 className="font-medium text-gray-900 line-clamp-2 mb-2 flex-1" title={deal.title}>
                    {deal.title}
                </h3>

                <div className="mt-auto pt-3 border-t border-gray-50">
                    <div className="flex items-end justify-between">
                        <div>
                            <div className="text-2xl font-bold text-gray-900">
                                {deal.currency === 'USD' ? '$' : deal.currency}{deal.totalPrice.toFixed(2)}
                            </div>
                            {deal.shippingCost === 0 && (
                                <div className="text-xs text-green-600 font-medium mt-0.5">
                                    Free Shipping
                                </div>
                            )}
                        </div>
                        <a
                            href={deal.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center justify-center px-4 py-2 bg-gray-900 text-white text-sm font-medium rounded-lg hover:bg-gray-800 transition-colors"
                        >
                            View Deal <ExternalLink className="w-3 h-3 ml-2" />
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
}
