const fs = require('fs');

// read the json file
const name = '_gardenofwords_';
fs.readFile(`./round1/${name}.json`, 'utf8', (err, data) => {
  if (err) throw err;
  let tweets = JSON.parse(data);
  let tweetsData = [];
  // filter the tweets that have more than 0 mentions
  tweets = tweets.filter((tweet) => tweet.entities.user_mentions.length === 0);
  //iterating through the objects
  tweets.forEach((tweet) => {
    let tweetData = {
      text: tweet.text,
      user: tweet.user.name,
      handle: name,
    };
    tweetsData.push(tweetData);
  });
  // write the array to a new json file
  fs.writeFile(`${name}-processed.json`, JSON.stringify(tweetsData), (err) => {
    if (err) throw err;
    console.log('The file has been saved!');
  });
});
