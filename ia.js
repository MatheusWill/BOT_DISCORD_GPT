import { TOKEN } from "./constants.js";
import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
  apiKey: TOKEN.TOKEN_GPT,
});

const openai = new OpenAIApi(configuration);

export async function ask(prompt) {
  const response = await openai.createCompletion({
    model: "text-davinci-002",
    prompt,
    temperature: 0.7,
    max_tokens: 256,
    top_p: 1,
    frequency_penalty: 0,
    presence_penalty: 0,
  });
  const answer = response.data.choices[0].text;
  return answer;
}
