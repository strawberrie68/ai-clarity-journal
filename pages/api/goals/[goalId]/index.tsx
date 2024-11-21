import { NextApiRequest, NextApiResponse } from "next";
import { Goal } from "../../../../models/Goal";
import connectDB from "../../../../lib/connectDB";
import { TaskCore, PopulatedGoalProps } from "@/types/goal";

async function getGoalById(req: NextApiRequest, res: NextApiResponse) {
    const { goalId } = req.query;

    if (!goalId) {
        return res.status(400).json({ error: "Missing goalId parameter" });
    }

    try {
        await connectDB();

        const goal = await Goal
            .findById(goalId)
            .populate<{ tasks: TaskCore[] }>({
                path: 'tasks',
                model: 'Task',
                select: 'taskName dueDate priority isCompleted emoji status'
            });

        if (!goal) {
            return res.status(404).json({ error: "Goal not found" });
        }

        res.status(200).json(goal);
    } catch (error) {
        console.error("Error fetching goal:", error);
        if (error instanceof Error && error.name === 'CastError') {
            return res.status(400).json({ error: "Invalid goal ID format" });
        }
        res.status(500).json({ error: "Could not fetch goal, Internal Server Error" });
    }
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    await connectDB();

    switch (req.method) {
        case "GET":
            await getGoalById(req, res);
            break;
        default:
            res.setHeader("Allow", ["GET"]);
            res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}