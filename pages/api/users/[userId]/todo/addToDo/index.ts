import { NextApiRequest, NextApiResponse } from "next";
import { User } from "../../../../../../models/User";
import connectDB from "../../../../../../lib/connectDB";


async function postToDo(req: NextApiRequest, res: NextApiResponse) {
    const { userId } = req.query;
    const task = req.body

    if (!userId || !task) {
        return res.status(400).json({ error: "Missing userId or task" });
    }

    try {
        await connectDB();
        const updatedUser = await User.findByIdAndUpdate(
            userId,
            { $push: { todo: task } },
            { new: true } // Option to return the updated document
        );

        if (!updatedUser) {
            return res.status(404).json({ error: "User not found" });
        }

        res.status(201).json(updatedUser);
    } catch (error) {
        console.error("Error adding task:", error);
        res.status(500).json({ error: "Could not add new task to user, Internal Server Error" });
    }
}

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    await connectDB();

    switch (req.method) {
        case "POST":
            await postToDo(req, res);
            break;
        default:
            res.setHeader("Allow", ["POST"]);
            res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
