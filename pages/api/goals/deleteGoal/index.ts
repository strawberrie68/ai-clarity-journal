import { NextApiRequest, NextApiResponse } from "next";
import { Goal } from "../../../../models/Goal";
import connectDB from "../../../../lib/connectDB";

async function deleteGoal(req: NextApiRequest, res: NextApiResponse) {
    const userId = req.query.userId as string;
    const { goalId } = req.body;

    if (!userId) {
        return res.status(400).json({ error: "Missing or invalid userId" });
    }

    if (!goalId) {
        return res.status(400).json({ error: "Missing goalId" });
    }

    try {
        await connectDB();
        const result = await Goal.deleteOne({ _id: goalId, userId: userId });

        if (result.deletedCount === 0) {
            return res.status(404).json({ error: "Goal not found" });
        }

        res.status(204).end();
    } catch (error) {
        console.error("Error deleting goal:", error);
        res.status(500).json({ error: "Could not delete goal, Internal Server Error" });
    }
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    await connectDB();

    switch (req.method) {
        case "DELETE":
            await deleteGoal(req, res);
            break;
        default:
            res.setHeader("Allow", ["DELETE"]);
            res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}