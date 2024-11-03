

export const PRIORITIES = {
    HIGH: 'High',
    MEDIUM: 'Medium',
    LOW: 'Low'
} as const;

export const STATUSES = {
    NOT_STARTED: 'Not Started',
    IN_PROGRESS: 'In Progress',
    COMPLETE: 'Complete'
} as const;

export type Priority = typeof PRIORITIES[keyof typeof PRIORITIES];
export type Status = typeof STATUSES[keyof typeof STATUSES];

export interface TaskProps {
    id?: string,
    emoji: string,
    color: string,
    taskName: string,
    priority: Priority,
    dueDate?: string,
    status: Status,
    isCompleted: boolean,
}


export interface ToDo {
    taskName?: string;
    dueDate?: Date;
    isCompleted?: boolean;
    emoji?: string;
    repeat?: "none" | "daily" | "weekly" | "monthly";
    nextDueDate?: Date;
    priority?: Priority;
}

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
    entries: Entry[];
    date: string;
    todo?: ToDo[];
}

export interface Entry {
    aiResponse: string;
    content: string;
    _id: string;
}

export interface Tab {
    key: string;
    label: string;
    content: JSX.Element;
}

export const priorityColors = {
    [PRIORITIES.HIGH]: "bg-red-100",
    [PRIORITIES.MEDIUM]: "bg-amber-100",
    [PRIORITIES.LOW]: "bg-blue-100"
} as const;