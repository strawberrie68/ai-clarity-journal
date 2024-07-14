import { Entry } from "@/models/Entry";
import { Journal } from "@/models/Journal";
import { User } from "@/models/User";
import connectDB from "@/pages/lib/connectDB";
import openai from "@/pages/lib/openaiClient";

// System prompts
const DIG_DEEPER_PROMPT = `
  Your role as an AI is to provide empathetic, supportive, and thoughtful responses to journal entries. 
  For each entry, respond with kindness, understanding, and encouragement. Address the user's thoughts 
  and feelings in a way that shows you are actively listening and provide thoughtful reflections or 
  questions to help them gain more clarity. Try to be concise and end with a question or reflection to 
  encourage the user to dig deeper, keep in mind you have max 150 tokens.
`;

const SUMMARY_PROMPT = `
  Can you summarize the main points of the journal entry. You will need to use this journal to have a 
  conversation with the user, so make sure you understand the main points. Keep in mind you have max 100 
  tokens. You will use this for future reference while having a conversation with the user.
`;

async function callOpenAI(prompt, content, maxTokens) {
  try {
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        { role: "system", content: prompt },
        { role: "user", content: content },
      ],
      temperature: 0,
      max_tokens: maxTokens,
    });

    return response.choices[0].message.content.trim();
  } catch (error) {
    console.error("Error calling OpenAI:", error);
    throw error;
  }
}

async function digDeeperEntry(content) {
  return callOpenAI(DIG_DEEPER_PROMPT, content, 150);
}
async function summaryEntry(content) {
  return callOpenAI(SUMMARY_PROMPT, content, 100);
}

async function createEntryAndJournal(userId, content) {
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

async function createJournal(req, res) {
  const { userId } = req.query;
  const { content } = req.body;

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

export default async function handler(req, res) {
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
