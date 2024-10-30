import { NextApiRequest, NextApiResponse } from "next";
import { Journal } from "@/models/Journal";
import connectDB from "@/lib/connectDB";
import { analyze } from "../../../../../../../lib/ai";

interface JournalInterface {
  keyInsight?: string;
  quote?: string;
  aiSummary?: string;
  color?: string;
  conversationSummary?: string;
  emoji?: string;
  haiku?: string;
  highlight?: string;
  mood?: string;
  sentiment?: string;
  title?: string;
  user: string;
  entries: Entry[];
  date: string;
  todo?: ToDo[];
}

interface ToDo {
  taskName?: String;
  dueDate?: String;
  isCompleted?: Boolean;
  emoji?: String;
  repeat?: "none" | "daily" | "weekly" | "monthly";
  nextDueDate?: String;
  priority?: "low" | "medium" | "high";
}

interface Entry {
  aiResponse: string;
  content: string;
  _id: string;
}

async function updateJournalEntry(journalId: string): Promise<JournalInterface | null> {
  try {
    const journal = (await Journal.findById(journalId)) as JournalInterface | null;

    if (!journal) {
      console.error("Journal not found");
      return null;
    }

    if (!journal.conversationSummary) {
      console.error("Conversation summary is missing");
      return null;
    }

    const aiResponse = await analyze(journal.conversationSummary);
    console.log(aiResponse);

    const updatedJournal = await Journal.findOneAndUpdate(
      { _id: journalId },
      {
        $set: {
          aiSummary: aiResponse?.aiSummary,
          sentiment: aiResponse?.sentiment,
          mood: aiResponse?.mood,
          highlight: aiResponse?.highlight,
          title: aiResponse?.title,
          keyInsight: aiResponse?.keyInsight,
          quote: aiResponse?.quote,
          haiku: aiResponse?.haiku,
          emoji: aiResponse?.emoji,
          color: aiResponse?.color,
          todo: aiResponse?.todo,
        },
      },
      { new: true }
    );

    if (!updatedJournal) {
      console.error("Journal not found");
      return null;
    }

    return updatedJournal;
  } catch (error) {
    console.error("Error updating journal:", error);
    throw error;
  }
}

async function finalizeJournal(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { journalId, userId } = req.query as {
      journalId: string;
      userId: string;
    };

    if (!userId || !journalId) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const journal = (await Journal.findOne({
      _id: journalId,
    })) as JournalInterface | null;

    if (!journal) {
      return res.status(404).json({ error: "Journal not found" });
    }

    const updatedData = await updateJournalEntry(journalId);
    return res
      .status(200)
      .json({ message: "Journal updated successfully", data: updatedData });
  } catch (error) {
    console.error("Error in finalizeJournal:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await connectDB();

  switch (req.method) {
    case "PUT":
      await finalizeJournal(req, res);
      break;
    default:
      res.setHeader("Allow", ["PUT"]);
      res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
