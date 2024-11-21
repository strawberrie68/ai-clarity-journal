import { NextApiRequest, NextApiResponse } from "next";
import connectDB from "../../../../../../lib/connectDB";
import { Task, ITask } from "../../../../../../models/Task"


async function postToDo(req: NextApiRequest, res: NextApiResponse) {
    const { userId } = req.query;
    const task = req.body

    if (!userId || !task) {
        return res.status(400).json({ error: "Missing userId or task" });
    }

    try {
        await connectDB();

        const newTask: Partial<ITask> = {
            taskName: task.taskName,
            dueDate: task.dueDate,
            isCompleted: task.isCompleted || false,
            emoji: task.emoji,
            repeat: task.repeat || "none",
            nextDueDate: task.nextDueDate ? new Date(task.nextDueDate) : new Date(),
            priority: task.priority || "low",
            status: task.status || "Not Started",
            color: task.color || "#ffffff",
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
