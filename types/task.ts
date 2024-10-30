
export type Priority = 'high' | 'medium' | 'low';
export type Status = 'not started' | 'in progress' | 'done'

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

