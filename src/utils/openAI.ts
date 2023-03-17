import { Configuration, OpenAIApi } from 'openai';

const configuration = new Configuration({
  apiKey: '<YOUR_API_KEY>',
});

export const openai = new OpenAIApi(configuration);

export const completion = async (prompt: string) => {
  return process.env.OPENAI_API_KEY;
  const res = await openai.createChatCompletion({
    model: 'gpt-3.5-turbo',
    messages: [{ role: 'user', content: prompt }],
  });

  const choices = res.data.choices;

  if (!res?.data?.choices) throw new Error('No choices');

  const result = choices[0]?.message?.content;

  if (!result) throw new Error('No result');

  return result;
};
