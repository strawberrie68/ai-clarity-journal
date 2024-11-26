import { NextApiRequest, NextApiResponse } from "next";
import { Task } from "../../../../models/Task";
import connectDB from "../../../../lib/connectDB";

async function deleteTask(req: NextApiRequest, res: NextApiResponse) {
    const userId = req.query.userId as string;
    const { taskId } = req.body;

    if (!userId) {
        return res.status(400).json({ error: "Missing or invalid userId" });
    }

    if (!taskId) {
        return res.status(400).json({ error: "Missing taskId" });
    }

    try {
        await connectDB();
        const result = await Task.deleteOne({ _id: taskId, userId: userId });

        if (result.deletedCount === 0) {
            return res.status(404).json({ error: "task not found" });
        }

        res.status(204).end();
    } catch (error) {
        console.error("Error deleting task:", error);
        res.status(500).json({ error: "Could not delete task, Internal Server Error" });
    }
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    await connectDB();

    switch (req.method) {
        case "DELETE":
            await deleteTask(req, res);
            break;
        default:
            res.setHeader("Allow", ["DELETE"]);
            res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}