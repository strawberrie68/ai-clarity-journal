import { NextApiRequest, NextApiResponse } from "next";
import { User } from "../../../models/User";
import connectDB from "../../../lib/connectDB";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const testUser = { username: "test-user", password: "test-password" };

async function testUserHandler(_req: NextApiRequest, res: NextApiResponse) {
  try {
    await User.deleteOne({ username: testUser.username });

    const hashedPassword = bcrypt.hashSync(testUser.password, 10);
    const user = new User({
      username: testUser.username,
      password: hashedPassword,
      name: "Thanks for testing my app! 🙂",
      email: "test@gmail.com",
      habits: [],
      journals: [],
    });
    await user.save();

    const passwordMatch = bcrypt.compareSync(testUser.password, user.password);
    if (passwordMatch) {
      const token = jwt.sign(
        { userId: user._id },
        process.env.JWT_SECRET as string,
        {
          expiresIn: "30m",
        }
      );
      return res.status(200).json({ token, userId: user._id });
    } else {
      return res.status(400).json({ error: "Invalid credentials" });
    }
  } catch (error) {
    res
      .status(500)
      .json({ error: `Internal Server Error: ${(error as Error).message}` });
  }
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await connectDB();

  switch (req.method) {
    case "POST":
      await testUserHandler(req, res);
      break;
    default:
      res.setHeader("Allow", ["POST"]);
      res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
