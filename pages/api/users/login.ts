import { NextApiRequest, NextApiResponse } from "next";
import { User } from "../../../models/User";
import connectDB from "../../../lib/connectDB";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

async function login(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { username, password } = req.body;
    if (!username || !password) {
      return res
        .status(400)
        .json({ error: "Username and password  are required" });
    }
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(401).json({ error: "Username not found" });
    }

    const passwordMatch = bcrypt.compareSync(password, user.password);
    if (!passwordMatch) {
      return res.status(401).json({ error: "Incorrect password" });
    }

    const token = jwt.sign(
      { userId: user._id },
      process.env.JWT_SECRET as string,
      {
        expiresIn: "7d",
      }
    );
    return res.status(200).json({ token, userId: user._id });
  } catch (error) {
    res.status(500).json({ error: `Internal Server Error + ${error}` });
  }
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await connectDB();

  switch (req.method) {
    case "POST":
      await login(req, res);
      break;
    default:
      res.setHeader("Allow", ["POST"]);
      res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
