import mongoose from "mongoose";

const Schema = mongoose.Schema;

export interface ITask extends Document {
    taskName: string;
    dueDate?: Date;
    isCompleted: boolean;
    color: string,
    emoji: string;
    repeat: "none" | "daily" | "weekly" | "monthly";
    nextDueDate: Date;
    priority: "Low" | "Medium" | "High";
    status: "Not Started" | "In Progress" | "Complete";
    userId: mongoose.Types.ObjectId;
    goalId?: mongoose.Types.ObjectId;
}

const taskSchema = new Schema<ITask>({
    taskName: { type: String, required: true },
    dueDate: { type: Date },
    color: { type: String },
    isCompleted: { type: Boolean, default: false },
    emoji: { type: String },
    repeat: { type: String, enum: ["none", "daily", "weekly", "monthly"], default: "none" },
    nextDueDate: { type: Date, default: Date.now },
    priority: { type: String, enum: ["Low", "Medium", "High"] },
    status: { type: String, enum: ["Not Started", "In Progress", "Complete"], default: "Not Started" },
    userId: { type: Schema.Types.ObjectId, ref: "User" },
    goalId: { type: Schema.Types.ObjectId, ref: "Goal" },
});

export const Task = mongoose.models.Task || mongoose.model("Task", taskSchema);
