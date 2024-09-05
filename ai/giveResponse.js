import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_KEY,
});

export const giveResponse = async (prompt, selectedWinesPayloads) => {
  console.log("OpenAI Response: ");
  const response = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [
      {
        role: "system",
        content:
          "You are chatbot, a wine specialist. Your top priority is to help guide users into selecting amazing wine and guide them with their requests.",
      },
      {
        role: "user",
        content: prompt,
      },
      {
        role: "assistant",
        content: selectedWinesPayloads.toString(),
      },
    ],
  });

  return response.choices[0].message.content;
};
