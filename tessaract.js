import Tesseract from 'tesseract.js';

// const Tesseract = require('tesseract.js');

Tesseract.recognize(
  'CNmenu.jpeg', // Path to the image you want to process
  'eng', // Language code (e.g., 'eng' for English)
  {
    logger: (info) => console.log(info), // Optional: Logging progress
  }
)
  .then(({ data: { text } }) => {
    console.log('Recognized text:', text);
  })
  .catch((error) => {
    console.error('Error:', error);
  });
