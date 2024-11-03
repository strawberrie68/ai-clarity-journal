import { NextApiRequest, NextApiResponse } from "next";
import { Task } from "../../../../models/Task"; // Adjust path to Task model
import connectDB from "../../../../lib/connectDB"; // Import your database connection

async function getTasks(req: NextApiRequest, res: NextApiResponse) {
    const userId = req.query.userId as string;
    console.log("Received userId:", userId);
    console.log("Type of userId:", typeof userId);

    if (!userId) {
        return res.status(400).json({ error: "Missing or invalid userId" });
    }

    try {
        await connectDB();

        // Let's first check if we have any tasks at all
        const allTasks = await Task.find({});
        console.log("All tasks in database:", allTasks);

        // Now let's check for the specific user
        const tasks = await Task.find({ userId });
        console.log("Tasks found for userId:", tasks);
        console.log("Query used:", { userId });

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
