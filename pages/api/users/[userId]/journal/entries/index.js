import { Entry } from "@/models/Entry";
import { Journal } from "@/models/Journal";
import { User } from "@/models/User";
import connectDB from "@/pages/lib/connectDB";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY,
});

async function digDeeperEntry(content) {
  try {
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content:
            "Your role as an AI is to provide empathetic, supportive, and thoughtful responses to journal entries. For each entry, respond with kindness, understanding, and encouragement. Address the user's thoughts and feelings in a way that shows you are actively listening and provide thoughtful reflections or questions to help them gain more clarity. Try to be concise and end with a question or reflection to encourage the user to dig deeper,keep in mind you have max 150 tokens.",
        },
        {
          role: "user",
          content: content,
        },
      ],
      temperature: 0,
      max_tokens: 150,
    });

    return response.choices[0].message.content.trim();
  } catch (error) {
    console.error("Error calling OpenAI:", error);
    throw error;
  }
}

async function summaryEntry(content) {
  try {
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content:
            "Can you summarize the main points of the journal entry. You will need to use this journal to have a conversation with the user, so make sure you understand the main points. Keep in mind you have max 100 tokens. You will use this for future reference while having a conversation with the user.",
        },
        {
          role: "user",
          content: content,
        },
      ],
      temperature: 0,
      max_tokens: 150,
    });

    return response.choices[0].message.content.trim();
  } catch (error) {
    console.error("Error calling OpenAI:", error);
    throw error;
  }
}

async function createEntryAndJournal(userId, content) {
  const summary = await summaryEntry(content);
  console.log("summary:", summary);
  const response = await digDeeperEntry(content);
  console.log("response:", response);

  const newEntry = new Entry({
    content,
    aiResponse: response,
  });
  console.log("newEntry:", newEntry)

  const entryData = await newEntry.save();
  console.log("entryData:", entryData)

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
  console.log("BE content:",content)



  if (!userId || !content) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  try {
    console.log("trying to add entry");
    const { entryData, journalData } = await createEntryAndJournal(
      userId,
      content
    );
    res.status(201).json({  entryData:entryData ,journal: journalData, journalId:journalData._id });
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
