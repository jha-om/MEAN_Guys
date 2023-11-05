import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: "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",
  dangerouslyAllowBrowser: true,
});

export async function sendMessagetoOpenAI(message) {
  try {
    const res = await openai.completions.create({
      model: "text-davinci-003",
      prompt: `${message}, tell me 3 remedies in bullet points`,
      max_tokens: 256,
      top_p: 1,
      frequency_penalty: 0,
      presence_penalty: 0,
    });
    console.log(res.choices[0]);
    return res.choices[0].text;
  } catch (error) {
    console.log(error);
  }
}
