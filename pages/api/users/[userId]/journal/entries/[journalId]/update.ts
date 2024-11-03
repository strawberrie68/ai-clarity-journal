import { NextApiRequest, NextApiResponse } from "next";
import { Journal } from "@/models/Journal";
import connectDB from "@/lib/connectDB";
import { Entry } from "@/models/Entry";
import openai from "@/lib/openaiClient";

// System prompts
const CONVERSATION_PROMPT = `
    You will be given background info and additional information about the user to have a conversation with the user. 
    Keep in mind you have max 100 tokens. Remember your role as an AI is to provide empathetic, supportive, and thoughtful 
    responses to journal entries. For each entry, respond with kindness, understanding, and encouragement. Address the user's 
    thoughts and feelings in a way that shows you are actively listening and provide thoughtful reflections or questions to help 
    them gain more clarity. Try to be concise and end with something helpful that can help towards something they are working on or stuck on
    .For example if they are swamped with work, maybe ask them try to work on the most important thing.Try to end with a question or prompt that can more them forward.
    Try not to repeat yourself. Try to comment only on the new info provided.
  `;
const SUMMARY_PROMPT = `
  Summarize the main points of the additional journal entry. You will be given background info on what is already saved. 
    Only respond with additional information you might want for future reference`;

async function callOpenAI(
  prompt: string,
  userMessage: string,
  maxTokens: number
): Promise<string> {
  try {
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        { role: "system", content: prompt },
        { role: "user", content: userMessage },
      ],
      temperature: 0,
      max_tokens: maxTokens,
    });

    const content = response.choices[0]?.message?.content?.trim();
    if (!content) {
      throw new Error("No content returned from OpenAI");
    }

    return content;
  } catch (error) {
    console.error("Error calling OpenAI:", error);
    throw error;
  }
}

async function conversationEntry(content: string, journalSummary: string) {
  const userMessage = `new info: ${content}. background info: ${journalSummary}`;
  return callOpenAI(CONVERSATION_PROMPT, userMessage, 150);
}

async function summaryEntry(content: string, journalSummary: string) {
  const userMessage = `new info: ${content}. background info: ${journalSummary}`;
  return callOpenAI(SUMMARY_PROMPT, userMessage, 150);
}

async function createEntryForJournal(content: string, summary: string) {
  const response = await conversationEntry(content, summary);
  const newEntry = new Entry({
    content,
    aiResponse: response,
  });
  const newEntryId = newEntry._id;
  await newEntry.save();
  return newEntryId;
}

async function updateJournal(req: NextApiRequest, res: NextApiResponse) {
  const { journalId, userId } = req.query;
  const { content } = req.body;

  if (!userId || !content) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  try {
    const journal = await Journal.findOne({ _id: journalId });
    if (!journal) {
      return res.status(404).json({ error: "Journal not found" });
    }

    const toAddToJournalSummary = await summaryEntry(
      content,
      journal.conversationSummary
    );
    const updatedSummary = `${journal.conversationSummary} ${toAddToJournalSummary}`;

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

    res.status(200).json(updatedJournal);
  } catch (error) {
    console.error("Error updating journal:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
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
