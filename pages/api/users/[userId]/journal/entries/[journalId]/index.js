import connectDB from "../../../../../../../lib/connectDB";
import { Journal } from "@/models/Journal";
import { Entry } from "@/models/Entry";

async function getUserJournal(req, res) {
  const { journalId } = req.query;

  try {
    await connectDB();
    const oneJournal = await Journal.find({ _id: journalId })
      .populate("entries")
      .exec();
    res.status(200).json(oneJournal);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
}

export default async function handler(req, res) {
  await connectDB();

  switch (req.method) {
    case "GET":
      await getUserJournal(req, res);
      break;
    default:
      res.setHeader("Allow", ["GET"]);
      res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
