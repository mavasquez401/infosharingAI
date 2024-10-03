import OpenAI from 'openai';
// import userData from './infotobot';
import dotenv from 'dotenv';

dotenv.config();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// testing picture reading

const main = async () => {
  try {
    const response = await openai.chat.completions.create({
      model: 'gpt-4-vision-preview',
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
