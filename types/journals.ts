export interface Journal {
    keyInsight?: string;
    quote?: string;
    aiSummary?: string;
    color?: string;
    conversationSummary?: string;
    emoji?: string;
    haiku?: string;
    highlight?: string;
    mood?: string;
    sentiment?: string;
    title?: string;
    user: string;
    entries: string[];
    date: string;
}