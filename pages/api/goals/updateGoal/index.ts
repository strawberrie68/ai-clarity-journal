import { NextApiRequest, NextApiResponse } from "next";
import connectDB from "../../../../lib/connectDB";
import { Goal } from "../../../../models/Goal"

async function updateGoal(req: NextApiRequest, res: NextApiResponse) {

    const { goalId, ...updates } = req.body;

    if (!goalId) {
        return res.status(400).json({ error: "Missing task ID" });
    }


    try {
        await connectDB();

        const updatedGoal = await Goal.findByIdAndUpdate(goalId, updates, { new: true });

        if (!updatedGoal) {
            return res.status(404).json({ error: "Goal not found" });
        }

        res.status(200).json(updatedGoal);
    } catch (error) {
        console.error("Error updating goal:", error);
        res.status(500).json({ error: "Could not update goal, Internal Server Error" });
    }
}

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    await connectDB();

    switch (req.method) {

        case "PATCH":
            await updateGoal(req, res);
            break;
        default:
            res.setHeader("Allow", [" PATCH"]);
            res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}