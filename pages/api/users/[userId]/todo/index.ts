import { NextApiRequest, NextApiResponse } from "next";
import { User } from "../../../../../models/User";
import connectDB from "../../../../../lib/connectDB";


async function updateToDo(req: NextApiRequest, res: NextApiResponse) {
    const { userId } = req.query;
    const newTodosArray = req.body;

    if (!userId || !newTodosArray) {
        return res.status(400).json({ error: "Missing userId or task" });
    }


    try {
        const result = await User.findOneAndUpdate(
            { _id: userId }, // Assuming userId is an ObjectId; change if it's a different type
            { $set: { todo: newTodosArray } }, // Replace the entire todos array
            { new: true } // Return the updated document
        );

        if (!result) {
            return res.status(404).send('User or todo task not found');
        }

        res.status(200).json(result);
    } catch (error) {
        res.status(500).send(error);
    }
}

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    await connectDB();

    switch (req.method) {

        case "PUT":
            await updateToDo(req, res);
            break;
        default:
            res.setHeader("Allow", [" PUT"]);
            res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}