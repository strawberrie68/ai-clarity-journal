import { z } from "zod";
import { PRIORITIES, STATUSES } from "@/types/task";


export const taskFormSchema = z.object({
    emoji: z.string()
        .optional()
        .transform(val => val || "😊")
        .refine((emoji) => {
            if (!emoji) return true;
            const emojiRegex = /(\u00a9|\u00ae|[\u2000-\u3300]|\ud83c[\ud000-\udfff]|\ud83d[\ud000-\udfff]|\ud83e[\ud000-\udfff])/;

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
    priority: z.enum([PRIORITIES.HIGH, PRIORITIES.MEDIUM, PRIORITIES.LOW]),
    dueDate: z.string().refine((date) => !isNaN(new Date(date).getTime()), {
        message: "Invalid date format",
    }),
    isCompleted: z.boolean(),
    status: z.enum([STATUSES.NOT_STARTED, STATUSES.IN_PROGRESS, STATUSES.COMPLETE]),
    userId: z.string().optional(),

})