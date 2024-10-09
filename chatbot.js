import OpenAI from 'openai';
import fs from 'fs';
import dotenv from 'dotenv';
import Tesseract from 'tesseract.js';

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

// const main = async () => {
//   try {
//     const response = await openai.chat.completions.create({
//       model: 'gpt-4o',
//       // 4o works but does not have access to web pages therefore cannot render image content
//       messages: [
//         {
//           role: 'user',
//           content: [
//             { type: 'text', text: 'write out the menu options' },
//             {
//               type: 'image_url',
//               image_url: {
//                 url: 'https://static.wixstatic.com/media/914db9_0cfe19a0c9224ef3bdcfe77e4776da5b~mv2.jpg/v1/fill/w_1208,h_1946,al_c,q_90,usm_0.66_1.00_0.01,enc_auto/CN%20Menu%20Jun24.jpg',
//               },
//             },
//           ],
//         },
//       ],
//     });
//     console.log(response);
//   } catch (error) {
//     console.error('Error:', error);
//   }
// };

// const completion = await openai.chat.completions.create({
//   model: 'gpt-4o',
//   messages: [
//     { role: 'system', content: 'You are a helpful assistant.' },
//     {
//       role: 'user',
//       content: 'Write a haiku about recursion in programming.',
//     },
//   ],
// });

// console.log(completion.choices[0].message);

// main();

// Function to extract text using Tesseract.js
async function extractTextFromImage(imagePath) {
  try {
    const result = await Tesseract.recognize(imagePath, 'eng', {
      logger: (m) => console.log(m), // Optional: to log OCR progress
    });
    return result.data.text; // Return the extracted text
  } catch (error) {
    console.error('Error during Tesseract OCR:', error);
    return null;
  }
}

// Function to send extracted text to OpenAI for processing
async function sendToOpenAI(extractedText) {
  try {
    // Send extracted text to OpenAI with instructions for cleanup and categorization
    const thread = await openai.chat.completions.create({
      model: 'gpt-4', // or 'gpt-4-turbo', depending on your plan
      messages: [
        { role: 'system', content: 'You are a helpful assistant.' },
        {
          role: 'user',
          content: `Here is the text extracted from an image of a menu:
          
          \`${extractedText}\`

          Please clean up this text by removing any noise or unnecessary characters. Then, organize the menu items into appropriate categories (e.g., appetizers, main courses, desserts, drinks). If possible, create a structured list format for the items and their prices.`,
          // The above block provides the instructions to OpenAI on how to clean up the extracted text
        },
      ],
    });

    console.log('OpenAI Response:', thread.choices[0].message.content);
  } catch (error) {
    console.error('Error with OpenAI API:', error);
  }
}

// Main function to run the whole flow
async function main() {
  // Step 1: Extract text from image using Tesseract
  const imagePath = './CNmenu.jpeg'; // Path to your image in the same folder
  const extractedText = await extractTextFromImage(imagePath);

  if (extractedText) {
    // Step 2: Send the extracted text to OpenAI for processing
    await sendToOpenAI(extractedText);
  }
}

// Run the main function
main();
