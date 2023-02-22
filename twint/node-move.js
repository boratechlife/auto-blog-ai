const fs = require('fs');
const files = ['file1.txt', 'file2.txt', 'file3.txt'];

try {
  const data = fs.readFileSync('usernames.txt', 'utf8');
  const files = data.split('\n').map((user) => user.trim() + '.json');
  console.log(files[0]);
  files.forEach((file) => {
    const source = `./${file}`;
    const destination = `./round4/${file}`;
    if (fs.existsSync(source)) {
      fs.renameSync(source, destination);
    } else {
      console.log(`${source} does not exist`);
    }
  });
} catch (err) {
  console.error(err);
}
