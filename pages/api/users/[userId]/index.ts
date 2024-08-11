import { NextApiRequest, NextApiResponse } from "next";
import { User } from "../../../../models/User";
import connectDB from "../../../../lib/connectDB";

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

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await connectDB();

  switch (req.method) {
    case "GET":
      await getUser(req, res);
      break;
    default:
      res.setHeader("Allow", ["GET"]);
      res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
