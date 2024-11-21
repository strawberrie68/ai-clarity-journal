import { NextApiRequest, NextApiResponse } from "next";
import { Task } from "../../../../models/Task";
import connectDB from "../../../../lib/connectDB";
import { TaskCore, PopulatedGoalProps } from "@/types/goal";

async function getTaskById(req: NextApiRequest, res: NextApiResponse) {
    const { taskId } = req.query;

    if (!taskId) {
        return res.status(400).json({ error: "Missing goalId parameter" });
    }

    try {
        await connectDB();

        const task = await Task
            .findById(taskId)

        if (!task) {
            return res.status(404).json({ error: "Task not found" });
        }

        res.status(200).json(task);
    } catch (error) {
        console.error("Error fetching task:", error);
        if (error instanceof Error && error.name === 'CastError') {
            return res.status(400).json({ error: "Invalid goal ID format" });
        }
        res.status(500).json({ error: "Could not fetch task, Internal Server Error" });
    }
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    await connectDB();

    switch (req.method) {
        case "GET":
            await getTaskById(req, res);
            break;
        default:
            res.setHeader("Allow", ["GET"]);
            res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}