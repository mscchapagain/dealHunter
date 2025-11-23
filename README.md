AI Deal Hunter Agent

Next.js • TypeScript • LLM • External API Integrations

An AI-powered deal-hunting agent that lets users search for the best live deals on any product across multiple online retailers. Users ask natural language questions (e.g., “find me the best deals on AirPods Pro 2”), and the system fetches + normalizes + ranks real prices, returning the top 5 best-value deals with an AI explanation.

⭐ Features

🧠 AI understanding of your query (product name, constraints, retailer preferences)

🔍 Multi-source deal fetching (Amazon-like APIs, BestBuy, Walmart, generic search APIs, etc.)

🔄 Normalized deal data across sources (price, shipping, rating, condition)

📊 Deal ranking algorithm to determine “best value”

💬 Chat-style interaction using LLM to explain results

⚡ Fast Next.js UI with clean deal cards

🌐 Robust integration layer for different shopping APIs

🎯 Goal

Deliver a modern AI Integration Engineer–style project that demonstrates:

LLM query understanding

Real external API integrations

Data pipelines & normalization

Value ranking logic

Chat UI + server actions in Next.js

This is designed as a portfolio-grade, end-to-end, production-like AI integration project.

📚 Table of Contents

Product Summary

Core Use Cases

Architecture

Tech Stack

API Design

Data Models

LLM Behavior

Scoring / Ranking Logic

UI Design

MVP Scope

Future Enhancements

📝 Product Summary

The AI Deal Hunter is an intelligent agent that:

Understands user queries with an LLM

Fetches deals from multiple online stores

Normalizes and ranks all results

Returns a structured top 5 list

Generates an AI-written explanation of why each deal is good

Example:

User: “Find me the best deals on a PS5 under $500”
Agent:

Parses intent

Gathers deals

Ranks deals

Provides a friendly explainer

🧑‍💻 Core Use Cases
✔ Single-Item Deal Search

“Best price for Bose QC45”

✔ Constraint-Based Search

“Find a 27-inch 4K monitor under $300”

✔ Category + Preferences

“Best budget noise-cancelling headphones with at least 4 stars”

✔ Conversational Follow-ups

“Only show Amazon and Best Buy deals”
“Sort by shipping cost”

🏗 Architecture
High-Level System Flow
User → Chat UI → /api/deals → LLM Query Parser
                                      ↓
                           Deal Source Adapters
                (Amazon, BestBuy, Walmart, Search API, etc.)
                                      ↓
                      Normalizer → Ranking Engine → LLM Summary
                                      ↓
                             Response → UI Render

🛠 Tech Stack
Frontend

Next.js (App Router)

TypeScript

Tailwind CSS

Backend

Next.js Server Actions or Route Handlers

OpenAI / Anthropic for LLMs

Deal source integrations (REST APIs or search APIs)

Data

In-memory for MVP

Optional future: Postgres or Supabase for logs / saved searches

📡 API Design
POST /api/deals

Input

{
  "query": "best price for sony xm5 headphones under 350"
}


Output

{
  "summary": "Here are the best deals I found…",
  "deals": [...top 5 deals...],
  "sourcesUsed": ["amazon", "bestbuy", "searchAPI"]
}

🧱 Data Models
NormalizedQuery
type NormalizedQuery = {
  productName: string;
  category?: string;
  maxPrice?: number;
  minRating?: number;
  preferredSources?: string[];
  notes?: string;
};

NormalizedDeal
type NormalizedDeal = {
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
};

🤖 LLM Behavior
1. Query Understanding Prompt

LLM extracts search parameters from user text and outputs strict JSON.

2. Result Explanation Prompt

LLM generates a human-friendly breakdown:

Cheapest option

Best-rated option

Best overall deal

Crucial rule:

LLM may not invent prices. It only comments on real retrieved data.

🧮 Scoring / Ranking Logic

Simple V1 formula:

score = - (totalPrice)
        + (rating * 2)
        + (log(reviewCount + 1))
        - penaltyForUsed


Return top 5 deals by score.

🎨 UI Design
Key Components

SearchBar

ChatThread

DealList

DealCard

LoadingSpinner

Pages

/ → main chat UI

/api/deals → backend endpoint

UX Goals

Fast

Clean

Mobile-friendly

Feels like a chat with a smart agent

🚀 MVP Scope
Must-Haves

Chat UI

LLM query parser

At least 2 deal source integrations

Normalization layer

Ranking engine

Top 5 deals + explanation

Nice-to-Have

Product images

Retailer logos

Query debug panel

🔮 Future Enhancements

User accounts

Saved searches

Price drop alerts

Browser extension

Multi-currency support

Affiliate link integration

Price history chart

Email or SMS digest of deals

📊 Success Metrics (Portfolio Level)

90% of queries return relevant deals

Error rate < 10% even if external APIs fail

Response time under ~5 seconds with 3 concurrent sources
