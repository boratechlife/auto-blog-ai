const apiKey = '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';
const model = 'text-davinci-002'; // or any other language model you prefer

import { Configuration, OpenAIApi } from 'openai';

const prompt =
  'Once upon a time, in a land far far away, there was a magical castle. The castle was...';

const configuration = new Configuration({
  apiKey,
});

const openaiClient = new OpenAIApi(configuration);

async function generateText(prompt) {
  const completions = await openaiClient.completions.create({
    engine: model,
    prompt,
    maxTokens: 60,
    n: 1,
    stop: '\n',
  });

  return completions.choices[0].text.trim();
}

// Example usage
(async () => {
  const generatedText = await generateText(prompt);
  console.log(generatedText);
})();
