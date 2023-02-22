const fs = require('fs');
const readline = require('readline');

async function processLineByLine() {
  const fileStream = fs.createReadStream('./cache/48_quotes.txt');

  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity,
  });
  // Note: we use the crlfDelay option to recognize all instances of CR LF
  // ('\r\n') in input.txt as a single line break.
  const lines = [];
  for await (const line of rl) {
    // Each line in input.txt will be successively available here as `line`.
    lines.push(line);
    //console.log(`Line from file: ${line}`);
  }
  const tobeWritten = [];
  for (const i of lines) {
    const splitted = i.split(' ');

    const textArr = splitted.slice(5, -2);

    const text = textArr.join(' ');
    if (textArr.length > 0) {
      tobeWritten.push(text);
    }
  }

  fs.writeFile(
    '../twint-astro/json/48_quotes.json',
    JSON.stringify(tobeWritten),
    (err) => {
      // throws an error, you could also catch it here
      if (err) throw err;

      // success case, the file was saved
      console.log('48_quotes saved!');
    }
  );

  //console.log('Text', tobeWritten);
}

processLineByLine();
