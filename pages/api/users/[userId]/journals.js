import { User } from "../../../../models/User";
import connectDB from "../../../lib/connectDB";

async function getUserJournals(req, res) {
  const { userId } = req.query;

  try {
    await connectDB();
    const oneUser = await User.find({ _id: userId }).populate("journals");

    if (!oneUser.length) {
      return res.status(404).json({ error: "User not found" });
    }
    res.status(200).json(oneUser[0].journals);
  } catch (error) {
    console.error("Error fetching user journals:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

export default async function handler(req, res) {
  console.log("Handling request to get journals");

  switch (req.method) {
    case "GET":
      await getUserJournals(req, res);
      break;
    default:
      res.setHeader("Allow", ["GET"]);
      res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
