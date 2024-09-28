const randomNames = [
  'Alice Johnson',
  'Bob Smith',
  'Charlie Brown',
  'Diana Ross',
  'Ethan Hunt',
  'Fiona Apple',
  'George Michael',
  'Hannah Montana',
  'Ian McKellen',
  'Julia Roberts',
];

const randomIDs = [
  '12345',
  '67890',
  '24680',
  '13579',
  '98765',
  '43210',
  '11223',
  '44556',
  '78901',
  '23456',
];

const userData = randomNames.map((name, index) => ({
  name: name,
  id: randomIDs[index],
}));

module.exports = userData;
