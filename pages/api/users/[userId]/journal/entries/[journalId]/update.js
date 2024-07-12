import { Journal } from "@/models/Journal";
import connectDB from "@/pages/lib/connectDB";
import { Entry } from "@/models/Entry";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY,
});

async function conversationEntry(content, journalSummary) {
  try {
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content:
            "You will be given background info and addition information about the user to have a conversation with the user.  Keep in mind you have max 100 tokens.  Remember your role as an AI is to provide empathetic, supportive, and thoughtful responses to journal entries. For each entry, respond with kindness, understanding, and encouragement. Address the user's thoughts and feelings in a way that shows you are actively listening and provide thoughtful reflections or questions to help them gain more clarity. Try to be concise and end with a thought provoking question or reflection to encourage the user to dig deeper. Try not to repeat yourself. Try to comment only on the new info provided.",
        },
        {
          role: "user",
          content: `new info: ${content}. background info: ${journalSummary}`,
        },
      ],
      temperature: 0,
      max_tokens: 150,
    });

    return response.choices[0].message.content.trim();
  } catch (error) {
    console.error("Error calling OpenAI: conversation Entry", error);
    throw error;
  }
}

async function summaryEntry(content, journalSummary) {
  try {
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content:
            "Summarize the main points of the additional journal entry. You will be given background info on what is already saved. Only respond with additional information you might want for future reference ",
        },
        {
          role: "user",
          content: `new info: ${content}. background info: ${journalSummary}`,
        },
      ],
      temperature: 0,
      max_tokens: 150,
    });

    return response.choices[0].message.content.trim();
  } catch (error) {
    console.error("Error calling OpenAI: summaryEntry", error);
    throw error;
  }
}

async function createEntryForJournal(content, summary) {
  const response = await conversationEntry(content, summary);
  const newEntry = new Entry({
    content,
    aiResponse: response,
  });

  const newEntryId = newEntry._id;

  await newEntry.save();

  return newEntryId;
}

async function updateJournal(req, res) {
  const { journalId, userId } = req.query;
  const { content } = req.body;
  if (!userId || !content) {
    return res.status(400).json({ error: "Missing required fields" });
  }
  const journal = await Journal.findOne({ _id: journalId });

  const toAddToJournalSummary = await summaryEntry(
    content,
    journal.conversationSummary
  );

  const updatedSummary =
    journal.conversationSummary + " " + toAddToJournalSummary;

  try {
    const newEntryId = await createEntryForJournal(
      content,
      journal.conversationSummary
    );

    const updatedJournal = await Journal.findOneAndUpdate(
      { _id: journalId },
      {
        $push: { entries: newEntryId },
        $set: { conversationSummary: updatedSummary },
      },
      { new: true }
    );

    if (!updatedJournal) {
      return res
        .status(404)
        .json({ error: "Journal not found or user mismatch" });
    }

    res.status(200).json(updatedJournal);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
}

export default async function handler(req, res) {
  await connectDB();

  switch (req.method) {
    case "PUT":
      await updateJournal(req, res);
      break;
    default:
      res.setHeader("Allow", ["PUT"]);
      res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
