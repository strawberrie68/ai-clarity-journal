import { NextApiRequest, NextApiResponse } from "next";
import { User } from "../../../../models/User";
import { Journal } from "../../../../models/Journal";
import connectDB from "../../../../lib/connectDB";

// This line ensures that the Journal model is registered in Mongoose
Journal;

async function getUser(req: NextApiRequest, res: NextApiResponse) {
  const { userId } = req.query;

  try {
    await connectDB();
    const oneUser = await User.find({ _id: userId }).populate("journals");
    res.status(200).json(oneUser);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
}

async function updateToDo(req: NextApiRequest, res: NextApiResponse) {
  const { userId } = req.query;
  const newTodosArray = req.body;

  if (!userId || !newTodosArray) {
    return res.status(400).json({ error: "Missing userId or task" });
  }


  try {
    const result = await User.findOneAndUpdate(
      { _id: userId }, // Assuming userId is an ObjectId; change if it's a different type
      { $set: { todos: newTodosArray } }, // Replace the entire todos array
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
    case "GET":
      await getUser(req, res);
      break;
    case "PUT":
      await updateToDo(req, res);
      break;
    default:
      res.setHeader("Allow", ["GET, PUT"]);
      res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
