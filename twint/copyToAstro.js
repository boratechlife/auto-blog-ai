const fs = require('fs');
const path = require('path');

const sourceDirs = ['round1/processed'];
const destinationDir = '../twint-astro/json';

// Ensure destination directory exists
fs.mkdirSync(destinationDir, { recursive: true });

sourceDirs.forEach((sourceDir) => {
  fs.readdir(sourceDir, (err, files) => {
    if (err) throw err;
    files.forEach((file) => {
      const sourcePath = path.join(sourceDir, file);
      const destinationPath = path.join(destinationDir, file);
      fs.copyFileSync(sourcePath, destinationPath);
      console.log(`${sourcePath} was copied to ${destinationPath}`);
    });
  });
});
