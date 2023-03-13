import { Configuration, OpenAIApi } from 'openai';
import fs from 'fs';
import pLimit from 'p-limit';

const apiKey = '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';
const configuration = new Configuration({
  apiKey: apiKey,
});

const openai = new OpenAIApi(configuration);
const usernames = ['liftyourmind', 'MasculineTheory'];
const limit = pLimit(4); // limit the number of requests to 4 per minute

usernames.forEach((username) => {
  const fileName = `./json/${username}.json`;
  const fileContents = fs.readFileSync(fileName, 'utf8');
  const json = JSON.parse(fileContents);
  const textFileName = `./ready/${username}.txt`;

  json.forEach(async (item, index) => {
    await limit(async () => {
      const text = await paraphrase(item.text);
      if (fs.existsSync(textFileName)) {
        fs.appendFileSync(textFileName, text + '\n');
        console.log(`Item append for ${username}:`, text);
      } else {
        fs.writeFileSync(textFileName, text + '\n');
        console.log(`Item write for ${username}:`, text);
      }
    });
    await wait((Math.floor(Math.random() * 9) + 4) * 1000);
  });
});

async function wait(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function paraphrase(text) {
  const response = await openai.createCompletion({
    model: 'text-davinci-003',
    prompt: `Re-write in two sentences in an intelligent instructive way:\n\n${text}`,
    temperature: 0.9,
    max_tokens: 400,
    top_p: 1,
    frequency_penalty: 0,
    presence_penalty: 0,
  });
  return response.data.choices[0].text.trim();
}
