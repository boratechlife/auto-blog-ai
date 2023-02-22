const Twit = require('twit');
const fs = require('fs');
const T = new Twit({
  consumer_key: 'fjzyC0RNXL4R2BEi78qG3zaNZ',
  consumer_secret: 'YUrugjkMPFG7deAUzJcEyLDFKQmmzXfbLyVNYq7rL6wOUCCBmh',
  access_token: '994082104660123648-6LcYgFdseA31caNxCYJBQOh2wEZrtYW',
  access_token_secret: 'HIeTUcXmSnIvnb5rDfUZBWsaNstKxyi0CkW6hgpjM6uKG',
});

try {
  const data = fs.readFileSync('usernames.txt', 'utf8');
  const users = data.split('\n').map((user) => user.trim());

  for (const user of users) {
    const screen_name = user;
    console.log(screen_name);
    const params = {
      screen_name,
      exclude: 'replies',
      until: '2023-11-07',
      count: 1000,
    };
    T.get('statuses/user_timeline', params, function (err, data, response) {
      if (err) {
        console.log(err);
      } else {
        // console.log(data);
        params.max_id = data[data.length - 1].id;
        T.get('statuses/user_timeline', params, function (err, data, response) {
          if (fs.existsSync(`${screen_name}.json`)) {
            fs.appendFileSync(`${screen_name}.json`, JSON.stringify(data));
          } else {
            fs.writeFileSync(`${screen_name}.json`, JSON.stringify(data));
          }
        });
      }
    });
  }
} catch (err) {
  console.error(err);
}
