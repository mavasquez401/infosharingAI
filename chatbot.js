import OpenAI from 'openai';
import fs from 'fs';
// import userData from './infotobot';
import dotenv from 'dotenv';

dotenv.config();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// testing picture reading

// code interpreter helps with image reading
// const assistant = await openai.beta.assistants.create({
//   instructions:
//     'You are a personal math tutor. When asked a math question, write and run code to answer the question.',
//   model: 'gpt-4o',
//   tools: [{ type: 'code_interpreter' }],
//   tool_resources: {
//     code_interpreter: {
//       file_ids: [file.id],
//     },
//   },
// });
// Upload a file with an "assistants" purpose
// const file = await openai.files.create({
//   file: fs.createReadStream('mydata.csv'),
//   purpose: 'assistants',
// });

// Create a thread with a user message and an attachment
// const thread = await openai.beta.threads.create({
//   messages: [
//     {
//       role: 'user',
//       content: 'I need to solve the equation `3x + 11 = 14`. Can you help me?',
//       attachments: [
//         {
//           file_id: file.id,
//           tools: [{ type: 'code_interpreter' }],
//         },
//       ],
//     },
//   ],
// });

const completion = await openai.chat.completions.create({
  model: 'gpt-4o',
  messages: [
    { role: 'system', content: 'You are a helpful assistant.' },
    {
      role: 'user',
      content: 'Write a haiku about recursion in programming.',
    },
  ],
});

console.log(completion.choices[0].message);

main();
