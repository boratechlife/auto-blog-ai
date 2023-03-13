import { Configuration, OpenAIApi } from 'openai';
import fs from 'fs';
const apiKey = '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';
const configuration = new Configuration({
  apiKey: apiKey,
});

const openai = new OpenAIApi(configuration);
const username = 'JamesClear';
const fileName = `./json/${username}.json`;
const fileContents = fs.readFileSync(fileName, 'utf8');
const json = JSON.parse(fileContents);
const textFileName = `./ready/${username}.txt`;

json.forEach(async (item, index) => {
  setTimeout(async () => {
    const text = await paraphrase(item.text);
    if (fs.existsSync(textFileName)) {
      fs.appendFileSync(textFileName, text + '\n');
      console.log('Item append:', text);
    } else {
      fs.writeFileSync(textFileName, text + '\n');
      console.log('Item write:', text);
    }
  }, index * ((Math.floor(Math.random() * 7) + 4) * 1000));
});
console.log(json);

export async function paraphrase(text) {
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
  // console.log('res', );
}

// const response = await openai.createCompletion({
//   model: 'text-davinci-003',
//   prompt:
//     'Re-write in two sentences:\n\nYou are the greatest, you are amazing.You are doing an amazing job out there',
//   temperature: 0.7,
//   max_tokens: 400,
//   top_p: 1,
//   frequency_penalty: 0,
//   presence_penalty: 0,
// });

// console.log(
//   'res',
//   await paraphrase(
//     'Having the right woman in your life is like printing your own money.'
//   )
// );
