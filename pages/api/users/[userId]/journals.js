import { User } from "../../../../models/User";
import connectDB from "../../../lib/connectDB";

async function getUserJournals(req, res) {
  const { userId } = req.query;

  try {
    await connectDB();
    const oneUser = await User.find({ _id: userId }).populate("journals");
    res.status(200).json(oneUser[0].journals);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
}

export default async function handler(req, res) {
  await connectDB();

  switch (req.method) {
    case "GET":
      await getUserJournals(req, res);
      break;
    default:
      res.setHeader("Allow", ["GET"]);
      res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
