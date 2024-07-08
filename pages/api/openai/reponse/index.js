import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const postOpenAI = async (req, res) => {
  const { prompt } = req.body;

  if (!prompt) {
    return res.status(400).json({ error: "Prompt is required" });
  }

  try {
    const response = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: prompt }],
    });

    res.json({
      aiResponse: response.data.choices[0].message.content,
    });
  } catch (error) {
    console.error("Error with OpenAI API:", error);
    res
      .status(500)
      .json({ error: "An error occurred while processing your request" });
  }
};

export { postOpenAI };
