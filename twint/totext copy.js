const fs = require('fs');

let concatenatedTweets = '';

for (let i = 1; i <= 2; i++) {
  const folderName = `round${i}`;
  const processedFolder = `${folderName}/processed`;
  const files = fs.readdirSync(processedFolder);
  files.forEach((file) => {
    if (file === 'amerix.json') {
      const filePath = `${processedFolder}/${file}`;
      const fileContent = JSON.parse(fs.readFileSync(filePath));
      fileContent.forEach((item) => {
        concatenatedTweets += item.text + '\n';
      });
    }
  });
}

fs.writeFileSync(`toastro/${username}.txt`, concatenatedTweets);
console.log('Tweets have been concatenated and written to a text file.');
