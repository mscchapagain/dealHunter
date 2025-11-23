'use client';

import { useState, useRef, useEffect } from 'react';
import { SearchBar } from './SearchBar';
import { DealList } from './DealList';
import { NormalizedDeal } from '@/types';
import { searchDeals } from '@/app/actions';
import { Bot, User } from 'lucide-react';
import clsx from 'clsx';

interface Message {
    id: string;
    role: 'user' | 'assistant';
    content: string;
    deals?: NormalizedDeal[];
}

export function ChatInterface() {
    const [messages, setMessages] = useState<Message[]>([
        {
            id: 'welcome',
            role: 'assistant',
            content: "Hi! I'm your AI Deal Hunter. Tell me what you're looking for, and I'll find the best prices for you."
        }
    ]);
    const [isLoading, setIsLoading] = useState(false);
    const bottomRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    const handleSearch = async (query: string) => {
        const userMsgId = Date.now().toString();
        setMessages(prev => [...prev, { id: userMsgId, role: 'user', content: query }]);
        setIsLoading(true);

        try {
            const result = await searchDeals(query);

            setMessages(prev => [...prev, {
                id: (Date.now() + 1).toString(),
                role: 'assistant',
                content: result.summary,
                deals: result.deals
            }]);
        } catch (error) {
            setMessages(prev => [...prev, {
                id: (Date.now() + 1).toString(),
                role: 'assistant',
                content: "Sorry, I encountered an error while searching for deals. Please try again."
            }]);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="flex flex-col h-screen max-w-5xl mx-auto p-4 md:p-6">
            <div className="flex-1 overflow-y-auto space-y-8 pb-24 no-scrollbar">
                {messages.map((msg) => (
                    <div key={msg.id} className={clsx(
                        "flex gap-4",
                        msg.role === 'user' ? "flex-row-reverse" : "flex-row"
                    )}>
                        <div className={clsx(
                            "w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0",
                            msg.role === 'user' ? "bg-blue-600 text-white" : "bg-emerald-600 text-white"
                        )}>
                            {msg.role === 'user' ? <User className="w-5 h-5" /> : <Bot className="w-5 h-5" />}
                        </div>

                        <div className={clsx(
                            "flex flex-col gap-4 max-w-[85%]",
                            msg.role === 'user' ? "items-end" : "items-start"
                        )}>
                            <div className={clsx(
                                "px-5 py-3 rounded-2xl text-sm md:text-base leading-relaxed",
                                msg.role === 'user'
                                    ? "bg-blue-600 text-white rounded-tr-none"
                                    : "bg-gray-100 text-gray-800 rounded-tl-none"
                            )}>
                                {msg.content}
                            </div>

                            {msg.deals && msg.deals.length > 0 && (
                                <div className="w-full mt-2">
                                    <DealList deals={msg.deals} />
                                </div>
                            )}
                        </div>
                    </div>
                ))}
                <div ref={bottomRef} />
            </div>

            <div className="fixed bottom-0 left-0 right-0 p-4 bg-white/80 backdrop-blur-md border-t border-gray-100">
                <SearchBar onSearch={handleSearch} isLoading={isLoading} />
            </div>
        </div>
    );
}
