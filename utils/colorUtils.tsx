import { Priority } from "@/types/task"


export const getPriorityColor = (priority: Priority) => {
    const colors = {
        High: 'bg-red-100 text-red-800',
        Medium: 'bg-yellow-100 text-yellow-800',
        Low: 'bg-green-100 text-green-800'
    };
    return colors[priority];
};