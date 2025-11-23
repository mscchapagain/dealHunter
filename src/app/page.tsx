import { ChatInterface } from '@/components/ChatInterface';

export default function Home() {
    return (
        <main className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
            <div className="max-w-7xl mx-auto">
                <header className="p-6 border-b border-gray-100 bg-white/50 backdrop-blur-sm sticky top-0 z-10">
                    <div className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold text-xl">
                            D
                        </div>
                        <h1 className="text-xl font-bold text-gray-900 tracking-tight">
                            Deal<span className="text-blue-600">Hunter</span> AI
                        </h1>
                    </div>
                </header>

                <ChatInterface />
            </div>
        </main>
    );
}
