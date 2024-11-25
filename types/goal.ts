import { Types } from "mongoose";
import { goalFormSchema } from "../schema/goal"
import { z } from "zod";
import { Priority, Task } from "./task";


export interface TaskCore {
    dueDate: Date;
    priority: "High" | "Medium" | "Low";
    isCompleted: boolean;
    emoji: string;
    taskName: string;
    color: string;
    status: "Not Started" | "In Progress" | "Complete";
    userId?: string;
}

export interface Goal {
    _id: Types.ObjectId | string;
    goalName: string;
    description: string;
    isCompleted: boolean;
    priority: Priority;
    emoji: string;
    userId: Types.ObjectId | string;
    dueDate: Date;
    tasks: Types.ObjectId[];
}
export interface PopulatedGoals {
    _id: Types.ObjectId | string;
    goalName: string;
    description: string;
    isCompleted: boolean;
    priority: Priority;
    emoji: string;
    userId: Types.ObjectId | string;
    dueDate: Date;
    tasks: Task[];
}

export interface GoalInput {
    goalName: string
}


// For unpopulated goals (what's actually in MongoDB)
export interface GoalProps {
    goalName: string;
    description?: string;
    dueDate: string;
    priority: "Low" | "Medium" | "High";
    tasks: Types.ObjectId[];
    isCompleted: boolean;
    userId?: string;
    emoji: string;
}

// For populated goals (after using .populate())
export interface PopulatedGoalProps {
    goalName: string;
    description?: string;
    dueDate?: Date;
    priority: "Low" | "Medium" | "High";
    tasks: TaskCore[];  // Array of actual task objects
    isCompleted: boolean;
    userId?: Types.ObjectId;
    emoji: string;
}

export type GoalFormValues = z.infer<typeof goalFormSchema>;


export const convertFormToGoalProps = (formValues: GoalFormValues): GoalProps => {
    return {
        ...formValues,
        tasks: [], // Start with empty array of task refs
    };
};