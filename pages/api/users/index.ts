import { NextApiRequest, NextApiResponse } from "next";
import { User } from "../../../models/User";
import connectDB from "../../../lib/connectDB";
import bcrypt from "bcryptjs";

async function getUser(req: NextApiRequest, res: NextApiResponse) {
  const { email, username } = req.query;

  if (!email && !username) {
    return res
      .status(400)
      .json({ error: "Email or username query parameter is required" });
  }

  try {
    let user;
    if (email) {
      user = await User.findOne({ email });
    } else if (username) {
      user = await User.findOne({ username });
    }

    if (user) {
      return res.status(200).json({ exists: true });
    } else {
      return res.status(200).json({ exists: false });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal server error" });
  }
}

async function createUser(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { username, name, habits, journals, email, password } = req.body;
    if (!name || !username || !email || !password) {
      return res
        .status(400)
        .json({ error: "Name, email, password and username are required" });
    }

    let user;
    if (email) {
      user = await User.findOne({ email });
      if (user) {
        return res
          .status(200)
          .json({ exists: true, message: "Email already exists" });
      }
    } else if (username) {
      user = await User.findOne({ username });
      if (user) {
        return res
          .status(200)
          .json({ exists: true, message: "Username already exists" });
      }
    }

    const hashedPassword = bcrypt.hashSync(password);

    const person = new User({
      username,
      name,
      habits,
      journals,
      email,
      password: hashedPassword,
    });
    await person.save();
    res.status(201).send("User created successfully");
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
    case "POST":
      await createUser(req, res);
      break;
    default:
      res.setHeader("Allow", ["GET", "POST"]);
      res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
