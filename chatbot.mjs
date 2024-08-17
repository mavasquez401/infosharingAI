import OpenAI from 'openai';
import userData from './infotobot';
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

//user data information
const user = userData;

// assistant creation
async function main() {
  const assistant = await openai.beta.assistants.create({
    name: 'Math Tutor',
    instructions:
      'You know everything about every user. using this data ${user} answer the question.',
    tools: [{ type: 'code_interpreter' }],
    model: 'gpt-4o',
  });
}

main();
