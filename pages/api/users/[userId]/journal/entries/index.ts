import { NextApiRequest, NextApiResponse } from "next";
import { Entry } from "@/models/Entry";
import { Journal } from "@/models/Journal";
import { User } from "@/models/User";
import connectDB from "@/lib/connectDB";
import openai from "@/lib/openaiClient";

// System prompts
const DIG_DEEPER_PROMPT = `
    You will be given background info and additional information about the user to have a conversation with the user.
    Keep in mind you have max 100 tokens. Remember your role as an AI is to provide empathetic, supportive, and thoughtful
    responses to journal entries. For each entry, respond with kindness, understanding, and encouragement. Address the user's
    thoughts and feelings in a way that shows you are actively listening and provide thoughtful reflections or questions to help
    them gain more clarity. Try to be concise and end with something helpful that can help towards something they are working on or stuck on
    .For example if they are swamped with work, maybe ask them try to work on the most important thing,  or what is one thing that will help them feel accomplished. 
    Try to end on a question, or a prompt that the user can write about to make them more forward.
     Try not to repeat yourself. 
`;

const SUMMARY_PROMPT = `
  Can you summarize the main points of the journal entry. You will need to use this journal to have a 
  conversation with the user, so make sure you understand the main points. Keep in mind you have max 100 
  tokens. You will use this for future reference while having a conversation with the user.
`;

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

async function digDeeperEntry(content: string): Promise<string> {
  return callOpenAI(DIG_DEEPER_PROMPT, content, 150);
}

async function summaryEntry(content: string): Promise<string> {
  return callOpenAI(SUMMARY_PROMPT, content, 100);
}

async function createEntryAndJournal(userId: string, content: string) {
  const summary = await summaryEntry(content);
  const response = await digDeeperEntry(content);

  const newEntry = new Entry({
    content,
    aiResponse: response,
  });

  const entryData = await newEntry.save();

  const newJournal = new Journal({
    entries: [entryData.id],
    user: userId,
    conversationSummary: summary,
  });

  const journalData = await newJournal.save();

  await User.findByIdAndUpdate(userId, {
    $push: { journals: journalData._id },
  });

  return { entryData, journalData };
}

async function createJournal(req: NextApiRequest, res: NextApiResponse) {
  const { userId } = req.query as { userId?: string };
  const { content } = req.body as { content?: string };

  if (!userId || !content) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  try {
    const { entryData, journalData } = await createEntryAndJournal(
      userId,
      content
    );
    res.status(201).json({
      entryData: entryData,
      journal: journalData,
      journalId: journalData._id,
    });
  } catch (error) {
    console.error("Error creating journal entry:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await connectDB();

  switch (req.method) {
    case "POST":
      await createJournal(req, res);
      break;
    default:
      res.setHeader("Allow", ["POST"]);
      res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
