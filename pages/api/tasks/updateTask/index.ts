import { NextApiRequest, NextApiResponse } from "next";
import connectDB from "../../../../lib/connectDB";
import { Task } from "../../../../models/Task"

async function updateToDo(req: NextApiRequest, res: NextApiResponse) {

    const { id: taskId, ...updates } = req.body;

    if (!taskId) {
        return res.status(400).json({ error: "Missing task ID" });
    }


    try {
        await connectDB();

        const updatedTask = await Task.findByIdAndUpdate(taskId, updates, { new: true });

        if (!updatedTask) {
            return res.status(404).json({ error: "Task not found" });
        }

        res.status(200).json(updatedTask);
    } catch (error) {
        console.error("Error updating task:", error);
        res.status(500).json({ error: "Could not update task, Internal Server Error" });
    }
}

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    await connectDB();

    switch (req.method) {

        case "PUT":
            await updateToDo(req, res);
            break;
        default:
            res.setHeader("Allow", [" PUT"]);
            res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}