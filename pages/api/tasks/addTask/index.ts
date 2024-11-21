import { NextApiRequest, NextApiResponse } from "next";
import connectDB from "../../../../lib/connectDB";
import { Task, ITask } from "../../../../models/Task";

async function postToDo(req: NextApiRequest, res: NextApiResponse) {
    console.log("Received request body:", req.body); // Add this line
    const { userId, taskName, dueDate, emoji, priority, status, color, isCompleted, nextDueDate } = req.body;
    console.log("status", status)
    // Log which fields are missing
    const missingFields = [];
    if (!userId) missingFields.push('userId');
    if (!taskName) missingFields.push('taskName');
    if (!emoji) missingFields.push('emoji');
    if (!priority) missingFields.push('priority');
    if (!status) missingFields.push('status');
    if (!color) missingFields.push('color');

    console.log("Missing fields:", missingFields); // Add this line

    if (!userId || !taskName || !emoji || !priority || !status || !color) {
        return res.status(400).json({
            error: "a field in your add to do is missing",
            missingFields: missingFields  // Add this to see which fields are missing
        });
    }

    try {
        await connectDB();

        const newTask: Partial<ITask> = {
            taskName: taskName,
            dueDate: dueDate,
            isCompleted: isCompleted || false,
            emoji: emoji,
            repeat: "none",
            nextDueDate: nextDueDate ? new Date(nextDueDate) : new Date(),
            priority: priority || "low",
            status: status || "Not Started",
            color: color || "#ffffff",
        };

        const taskDocument = new Task({ ...newTask, userId });
        const savedTask = await taskDocument.save();

        res.status(201).json(savedTask);
    } catch (error) {
        console.error("Error adding task:", error);
        res.status(500).json({ error: "Could not add new task to user, Internal Server Error" });
    }
}

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    await connectDB();

    switch (req.method) {
        case "POST":
            await postToDo(req, res);
            break;
        default:
            res.setHeader("Allow", ["POST"]);
            res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}