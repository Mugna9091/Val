export function load(){
  const fs = require('fs');

  const data = {
    name: 'John Doe',
    age: 30,
    email: 'john@example.com'
  };

  const jsonString = JSON.stringify(data, null, 2);

  const filePath = './json/partita.json'; // Replace with your desired file path

  fs.writeFile(filePath, jsonString, 'utf8', (err) => {
    if (err) {
      console.error('An error occurred while writing the file:', err);
    } else {
      console.log('File has been successfully written!');
    }
  });
}
