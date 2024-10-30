import { z } from "zod";

const priorityEnum = z.enum(["high", "medium", "low"]);
const statusEnum = z.enum(['not started', 'in progress', 'done'])

export const taskFormSchema = z.object({
    emoji: z.string()
        .min(1, "Emoji is required")
        .refine((emoji) => {
            const emojiRegex = /([\u203C-\u3299]|[\uD83C\uD83D][\uDC00-\uDFFF]|[\u2600-\u26FF]|[\u2700-\u27BF]|[\u1F300-\u1F5FF]|[\u1F680-\u1F6FF]|[\u1F700-\u1F77F]|[\u1F900-\u1F9FF]|[\u1FA00-\u1FAFF])/;
            return emojiRegex.test(emoji);
        }, {
            message: "Must be a valid emoji",
        }),
    color: z.string()
        .min(1, "Color is required")
        .regex(/^#[0-9A-Fa-f]{6}$/, "Invalid hex color code"),
    taskName: z.string()
        .min(1, "Task name is required")
        .max(50, "Task name is too long"),
    priority: priorityEnum,
    dueDate: z.string().refine((date) => !isNaN(new Date(date).getTime()), {
        message: "Invalid date format",
    }),
    isCompleted: z.boolean(),
    status: statusEnum,
    id: z.string().optional(),

})