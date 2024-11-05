import { NextApiRequest, NextApiResponse } from "next";
import { Task } from "../../../../models/Task"; // Adjust path to Task model
import connectDB from "../../../../lib/connectDB"; // Import your database connection

async function getTasks(req: NextApiRequest, res: NextApiResponse) {
    const userId = req.query.userId as string;

    if (!userId) {
        return res.status(400).json({ error: "Missing or invalid userId" });
    }

    try {
        await connectDB();
        const tasks = await Task.find({ userId });
        res.status(200).json(tasks);
    } catch (error) {
        console.error("Error fetching tasks:", error);
        res.status(500).json({ error: "Could not fetch tasks, Internal Server Error" });
    }
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    await connectDB();

    switch (req.method) {
        case "GET":
            await getTasks(req, res);
            break;
        default:
            res.setHeader("Allow", ["GET"]);
            res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
