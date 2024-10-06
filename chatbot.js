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
const assistant = await openai.beta.assistants.create({
  instructions:
    'You are a personal math tutor. When asked a math question, write and run code to answer the question.',
  model: 'gpt-4o',
  tools: [{ type: 'code_interpreter' }],
  tool_resources: {
    code_interpreter: {
      file_ids: [file.id],
    },
  },
});
// Upload a file with an "assistants" purpose
const file = await openai.files.create({
  file: fs.createReadStream('mydata.csv'),
  purpose: 'assistants',
});

// Create a thread with a user message and an attachment
const thread = await openai.beta.threads.create({
  messages: [
    {
      role: 'user',
      content: 'I need to solve the equation `3x + 11 = 14`. Can you help me?',
      attachments: [
        {
          file_id: file.id,
          tools: [{ type: 'code_interpreter' }],
        },
      ],
    },
  ],
});

const main = async () => {
  try {
    const response = await openai.chat.completions.create({
      model: 'gpt-4o',
      // 4o works but does not have access to web pages therefore cannot render image content
      messages: [
        {
          role: 'user',
          content: [
            { type: 'text', text: 'write out the menu options' },
            {
              type: 'image_url',
              image_url: {
                url: 'https://static.wixstatic.com/media/914db9_0cfe19a0c9224ef3bdcfe77e4776da5b~mv2.jpg/v1/fill/w_1208,h_1946,al_c,q_90,usm_0.66_1.00_0.01,enc_auto/CN%20Menu%20Jun24.jpg',
              },
            },
          ],
        },
      ],
    });
    console.log(response);
  } catch (error) {
    console.error('Error:', error);
  }
};

main();
