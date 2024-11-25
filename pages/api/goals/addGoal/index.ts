import { NextApiRequest, NextApiResponse } from "next";
import connectDB from "../../../../lib/connectDB";
import { Goal, IGoal } from "../../../../models/Goal";

async function postGoal(req: NextApiRequest, res: NextApiResponse) {
    const { userId, goalName, description, dueDate, tasks, priority, emoji } = req.body;

    const missingFields = [];
    if (!emoji) missingFields.push('emoji');
    if (!goalName) missingFields.push('goalName');
    if (!description) missingFields.push('description');
    if (!dueDate) missingFields.push('dueDate');
    if (!priority) missingFields.push('priority');
    if (!tasks) missingFields.push('tasks');
    if (!userId) missingFields.push('userId')

    console.log("Missing fields:", missingFields);

    if (missingFields.length > 0) {
        return res.status(400).json({
            error: "Required fields are missing",
            missingFields: missingFields
        });
    }

    try {
        await connectDB();

        let parsedDueDate: Date;
        try {
            parsedDueDate = new Date(dueDate);

            if (isNaN(parsedDueDate.getTime())) {
                throw new Error('Invalid date format');
            }
        } catch (error) {
            return res.status(400).json({
                error: "Invalid date format for dueDate",
                details: "Please provide a valid date string"
            });
        }

        const newGoal: Partial<IGoal> = {
            emoji,
            goalName,
            description,
            dueDate: parsedDueDate, // Use the parsed date
            priority: priority || "Low",
            tasks: tasks || [],
            isCompleted: false,
        };

        const goalDocument = new Goal({ ...newGoal, userId });
        const savedGoal = await goalDocument.save();

        res.status(201).json(savedGoal);
    } catch (error) {
        console.error("Error adding goal", error);
        res.status(500).json({ error: "Could not add new goal to user, Internal Server Error" });
    }
}

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    await connectDB();

    switch (req.method) {
        case "POST":
            await postGoal(req, res);
            break;
        default:
            res.setHeader("Allow", ["POST"]);
            res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}