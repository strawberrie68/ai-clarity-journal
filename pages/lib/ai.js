// import { OpenAI } from "langchain/llms/openai";
import { OpenAI } from "@langchain/openai";
import { StructuredOutputParser } from "langchain/output_parsers";
import { PromptTemplate } from "langchain/prompts";
import { z } from "zod";

const parser = StructuredOutputParser.fromZodSchema(
  z.object({
    mood: z
      .string()
      .describe("the mood of the person who wrote the journal entry.")
      .optional(),
    title: z
      .string()
      .describe(
        "the subject of the journal entry. Summarize the entry in one sentence. The title should be a concise summary of the entry. The first character of the title should contain an emoji that represents the mood of the entry."
      )
      .optional(),

    aiSummary: z
      .string()
      .describe(
        "quick summary of the entire journal entry, while highlighting the main points like the struggles, highlights of the day while making the user feel understood and heard. Act as a objective friend or therapist that responds with empathy, validation, and insightful advice, start by recognizing and identifying the user's emotions, such as mixed feelings of gratitude, frustration, and disappointment. Validate the user's experience by affirming that it is understandable to feel conflicted and that their emotions are valid. Provide insight by highlighting the user's self-awareness and maturity in decision-making, acknowledging their careful consideration of opportunities and their impacts. Offer thoughtful suggestions that encourage the user to focus on what brings them joy and fulfillment, and suggest evaluating if certain relationships align with their values. Emphasize the importance of trusting instincts and prioritizing well-being, and reassure the user by reinforcing the idea that they deserve uplifting and supportive relationship"
      )
      .optional(),
    highlight: z
      .string()
      .describe(
        "a highlight of the day, a positive event that happened to the person who wrote the journal entry. This could be a small or big event, but it should be something that made the person happy or should be proud about."
      )
      .optional(),
    sentiment: z
      .number()
      .describe(
        "sentiment of the text and rated on a scale of -10 to 10 is extremely negative, 0 is neutral, and 10 is extremely positive."
      )
      .optional(),
    keyInsight: z
      .number()
      .describe(
        "describe the key insight or takeaway from the journal entry. This could be a lesson learned, a realization, or a piece of advice that the person who wrote the journal entry wants to remember or share. Make it a concise sentence that is impactful. Make it sound like a lesson."
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
  console.log(entries);

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
