import { z } from "zod";
import { PRIORITIES, STATUSES } from "@/types/task";
import mongoose from "mongoose";
import { Types } from "mongoose";

export const taskFormSchema = z.object({
    emoji: z.string().min(1, "Emoji is required"),
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
    status: z.enum([STATUSES.NOT_STARTED, STATUSES.IN_PROGRESS, STATUSES.COMPLETED]),
    userId: z.union([
        z.string(),
        z.instanceof(mongoose.Types.ObjectId)
    ]).optional(),
    goalId: z.string().optional().or(z.instanceof(Types.ObjectId)).transform(val => val ? String(val) : ''),


})