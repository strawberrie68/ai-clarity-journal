import { User } from "../../../models/User";
import connectDB from "../../lib/connectDB";

async function getUser(req, res) {
  try {
    const users = await User.find({});
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
}

async function createUser(req, res) {
  try {
    const { username, name, habits, journals } = req.body;
    if (!name || !username) {
      return res.status(400).json({ error: "Name and email are required" });
    }
    const person = new User({ username, name, habits, journals });
    await person.save();
    res.status(201).json({ person });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
}

export default async function handler(req, res) {
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
