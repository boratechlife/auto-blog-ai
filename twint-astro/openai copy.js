const apiKey = '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';
const model = 'text-davinci-002'; // or any other language model you prefer

import { Configuration, OpenAIApi } from 'openai';

const configuration = new Configuration({
  apiKey: apiKey,
});
const openai = new OpenAIApi(configuration);

const completion = await openai.createCompletion({
  model: 'text-davinci-002',
  prompt: 'How are you?',
});
console.log(completion.data.choices[0].text);
