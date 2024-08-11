import { NextApiRequest, NextApiResponse } from "next";
import { Journal } from "../../../models/Journal";
import connectDB from "../../../lib/connectDB";

async function getJournals(_req: NextApiRequest, res: NextApiResponse) {
  try {
    const Journals = await Journal.find({});
    res.status(200).json(Journals);
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
      await getJournals(req, res);
      break;

    default:
      res.setHeader("Allow", ["GET"]);
      res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
