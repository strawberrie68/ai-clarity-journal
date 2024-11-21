import { NextApiRequest, NextApiResponse } from "next";
import { Goal } from "../../../../models/Goal"; // Adjust path to Task model
import connectDB from "../../../../lib/connectDB"; // Import your database connection
import { TaskCore, PopulatedGoalProps } from "@/types/goal"

async function getGoalsWithTasks(req: NextApiRequest, res: NextApiResponse) {
    const userId = req.query.userId as string;
    console.log("get is being called")
    if (!userId) {
        return res.status(400).json({ error: "Missing or invalid userId" });
    }

    try {
        await connectDB();
        const goals = await Goal
            .find({ userId })
            .populate<{ tasks: TaskCore[] }>({
                path: 'tasks',
                model: 'Task',
                select: 'taskName dueDate priority isCompleted emoji status'
            });

        // return goals as PopulatedGoalProps[];
        res.status(200).json(goals);
    } catch (error) {
        console.error("Error fetching goals:", error);
        res.status(500).json({ error: "Could not fetch goals, Internal Server Error" });
    }
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    await connectDB();

    switch (req.method) {
        case "GET":
            await getGoalsWithTasks(req, res);
            break;
        default:
            res.setHeader("Allow", ["GET"]);
            res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
