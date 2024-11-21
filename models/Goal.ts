import mongoose, { Document, Schema } from "mongoose";
import { ITask } from "../models/Task"

export interface IGoal extends Document {
    goalName: string;
    description?: string;
    dueDate?: Date;
    priority?: "Low" | "Medium" | "High";
    tasks: ITask[];
    isCompleted: boolean;
    userId: mongoose.Types.ObjectId;
    emoji: string;
}


const goalSchema = new Schema<IGoal>({
    goalName: { type: String, required: true },
    emoji: { type: String },
    description: { type: String },
    dueDate: { type: Date },
    priority: { type: String, enum: ["Low", "Medium", "High"] },
    tasks: [
        {
            type: Schema.Types.ObjectId,
            ref: "Task",
        },
    ],
    isCompleted: { type: Boolean, default: false },
    userId: mongoose.Types.ObjectId
});

goalSchema.virtual("progress").get(function () {
    const totalTasks = this.tasks.length;
    const completedTasks = this.tasks.filter((task) => task.isCompleted).length;

    return {
        totalTasks,
        completedTasks,
        percentage: totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0,
    };
});

export const Goal = mongoose.models.Goal || mongoose.model<IGoal>("Goal", goalSchema);
