import { Configuration, OpenAIApi } from 'openai';
const apiKey = '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';
const configuration = new Configuration({
  apiKey: apiKey,
});
const openai = new OpenAIApi(configuration);

export async function paraphrase(text) {
  const response = await openai.createCompletion({
    model: 'text-davinci-003',
    prompt: `Re-write in two sentences:\n\n${text}`,
    temperature: 0.7,
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

console.log('res', await paraphrase('Good job!'));
