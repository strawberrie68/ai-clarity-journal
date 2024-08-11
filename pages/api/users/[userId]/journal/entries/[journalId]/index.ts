import { NextApiRequest, NextApiResponse } from "next";
import connectDB from "../../../../../../../lib/connectDB";
import { Journal } from "@/models/Journal";
import { Entry } from "@/models/Entry";

async function getUserJournal(req: NextApiRequest, res: NextApiResponse) {
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

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
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
