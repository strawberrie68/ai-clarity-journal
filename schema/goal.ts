import { z } from "zod";
import { PRIORITIES } from "@/types/task";

export const goalFormSchema = z.object({
    goalName: z.string()
        .min(1, "Goal name is required")
        .max(50, "Goal name is too long"),
    description: z.string().optional(),
    priority: z.enum([PRIORITIES.HIGH, PRIORITIES.MEDIUM, PRIORITIES.LOW]),
    dueDate: z.string().refine((date) => !isNaN(new Date(date).getTime()), {
        message: "Invalid date format",
    }),
    isCompleted: z.boolean(),
    userId: z.string().optional(),
    tasks: z.array(z.any()).default([]),
    emoji: z.string().min(1, "Emoji is required"),
})

