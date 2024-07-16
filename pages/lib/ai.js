import { OpenAI } from "@langchain/openai";
import { StructuredOutputParser } from "langchain/output_parsers";
import { PromptTemplate } from "langchain/prompts";
import { z } from "zod";

const parser = StructuredOutputParser.fromZodSchema(
  z.object({
    aiSummary: z
      .string()
      .describe(
        `
        quick summary of the entire journal entry, while highlighting the main points like the struggles,
        highlights of the day while making the user feel understood and heard. Act as a objective friend or therapist
        that responds with empathy, validation, and insightful advice, start by recognizing and identifying 
        the user's emotions, such as mixed feelings of gratitude, frustration, and disappointment. 
        Validate the user's experience by affirming that it is understandable to feel conflicted and 
        that their emotions are valid. Provide insight by highlighting the user's self-awareness and 
        maturity in decision-making, acknowledging their careful consideration of opportunities and their 
        impacts. Offer thoughtful suggestions that encourage the user to focus on what brings them joy and 
        fulfillment, and suggest evaluating if certain relationships align with their values. Emphasize the 
        importance of trusting instincts and prioritizing well-being, and reassure the user by reinforcing 
        the idea that they deserve uplifting and supportive relationship
        `
      )
      .optional(),
    color: z
      .string()
      .describe(
        `
        Pick a hex color that is pastel color. I want it super pale, almost white.
        You should be playful with the hex color, if the user mention an object or a place, 
        pick a color that represents that object or place. Do not use gray or black.`
      )
      .optional(),
    emoji: z
      .string()
      .describe(
        `
        Pick a emoji that represents the mood or the highlight the journal entry. 
        The emoji should be appropriate and relevant to the content of the journal entry. 
        If the user mention a highlight, pick an emoji representing that or important change
        they must do rather than mood."
      `
      )
      .optional(),
    haiku: z
      .string()
      .describe(
        `
      write a haiku that captures the essence of the journal entry. 
      A haiku is a form of Japanese poetry that consists of three lines with a 5-7-5 syllable structure. 
      The haiku should be a reflection of the mood, theme, or message of the journal entry.
      It should be concise and evocative, using vivid imagery and sensory details to create 
      a sense of atmosphere or emotion. The haiku should be thought-provoking and contemplative,
      `
      )
      .optional(),
    highlight: z
      .string()
      .describe(
        `A highlight of the day, a positive event that happened to the person who wrote the journal entry.
        This could be a small or big event, but it should be something that made the person happy or 
        should be proud about.
        `
      )
      .optional(),
    keyInsight: z
      .string()
      .describe(
        `
      Describe the key insight or takeaway from the journal entry. This could be a lesson learned,
      a realization, or a piece of advice that the person who wrote the journal entry wants to 
      remember or share. Make it a concise sentence that is impactful. Make it sound like a lesson.
      `
      )
      .optional(),
    mood: z
      .string()
      .describe("the mood of the person who wrote the journal entry.")
      .optional(),
    sentiment: z
      .number()
      .describe(
        ` Sentiment of the text and rated on a scale of -10 to 10 is extremely negative,
      0 is neutral, and 10 is extremely positive.
      `
      )
      .optional(),
    title: z
      .string()
      .describe(
        `The subject of the journal entry. Summarize the entry in one sentence.
        The title should be a concise summary of the entry. It should capture the main theme or message 
        of the entry and give the reader an idea of what to expect. The title should be engaging and intriguing, 
        drawing the reader in and making them want to read more. It should be descriptive and informative, 
        giving the reader a clear idea of what the entry is about. The title should be interesting and 
        attention-grabbing, making the reader curious to learn more about the entry.
`
      )
      .optional(),
    quote: z
      .string()
      .describe(
        `Write a quote that might be relevant to the journal entry. This could be a quote from a famous person, 
        a book, or a movie that relates to the content of the journal entry. The quote should be inspiring, 
        thought-provoking, or comforting. It should be something that the person who wrote the journal entry
        might find helpful or meaningful.
        `
      )
      .optional(),
  })
);

async function getPrompt(content) {
  const format_instructions = parser.getFormatInstructions();

  const prompt = new PromptTemplate({
    template:
      "Analyze the following journal entry. Follow the instructions and format your response to match the format instructions, no matter what! \n{format_instructions}\n{entry}",
    inputVariables: ["entry"],
    partialVariables: { format_instructions },
  });

  const input = await prompt.format({
    entry: content,
  });

  return input;
}

export async function analyze(entries) {
  const input = await getPrompt(entries, parser.getFormatInstructions());
  const model = new OpenAI({
    temperature: 0,
    modelName: "gpt-3.5-turbo",
    apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY,
  });
  const result = await model.call(input);

  try {
    return parser.parse(result);
  } catch (error) {
    console.error(error);
  }
}
