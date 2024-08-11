import { NextApiRequest, NextApiResponse } from "next";
import { User } from "../../../../models/User";
import { Journal } from "@/models/Journal";
import connectDB from "../../../../lib/connectDB";

// This line ensures that the Journal model is registered in Mongoose
Journal;

async function getUserJournals(req: NextApiRequest, res: NextApiResponse) {
  const { userId } = req.query;

  try {
    await connectDB();
    const oneUser = await User.findById(userId).populate("journals");

    if (!oneUser) {
      return res.status(404).json({ error: "User not found" });
    }
    res.status(200).json(oneUser.journals);
  } catch (error) {
    console.error("Error fetching user journals:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  switch (req.method) {
    case "GET":
      await getUserJournals(req, res);
      break;
    default:
      res.setHeader("Allow", ["GET"]);
      res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
