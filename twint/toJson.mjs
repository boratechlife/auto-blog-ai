import fs from 'fs';
import path from 'path';

import { paraphrase } from '../twint-astro/paraphrase.js';

async function readFileAndWrite(folder_path, name) {
  // check if the folder exists
  if (!fs.existsSync(`${folder_path}/processed`)) {
    fs.mkdirSync(`${folder_path}/processed`);
  }
  // read the json file
  fs.readFile(`./${folder_path}/${name}`, 'utf8', (err, data) => {
    if (err) throw err;
    let tweets = JSON.parse(data);
    let tweetsData = [];
    // filter the tweets that have more than 0 mentions
    tweets = tweets.filter(
      (tweet) => tweet.entities.user_mentions.length === 0
    );
    //iterating through the objects
    tweets.forEach(async (tweet) => {
      const text = await paraphrase(tweet.text);
      let tweetData = {
        text: text,
        user: tweet.user.name,
        handle: path.parse(name).name,
      };
      tweetsData.push(tweetData);
    });

    let outputFile = `${folder_path}/processed/${name}`;
    // Check if file already exists
    if (fs.existsSync(outputFile)) {
      fs.readFile(outputFile, 'utf8', (err, oldData) => {
        if (err) throw err;
        // parse the old data
        let oldDataParsed = JSON.parse(oldData);
        // Append new data to the old data
        let newData = [...oldData, ...tweetsData];

        fs.unlink(outputFile, (err) => {
          if (err) throw err;
          // console.log(`${fileName}.json was deleted`);

          fs.writeFile(outputFile, JSON.stringify(newData), (err) => {
            if (err) throw err;
            console.log(`The file ${name} has been saved!`);
          });
        });
      });
    } else {
      // write the array to a new json file
      fs.writeFile(outputFile, JSON.stringify(tweetsData), (err) => {
        if (err) {
          throw err;
        }
        console.log(`The file ${name} has been saved!`);
      });
    }
  });
}
// read the contents of a folder
let folder_path = './twint/round2';
fs.readdir(folder_path, (err, files) => {
  if (err) throw err;
  //iterating through the files
  files.forEach(async (file) => {
    if (file.endsWith('.json')) {
      //read the content of the file
      await readFileAndWrite(folder_path, file);
    }
  });
});
