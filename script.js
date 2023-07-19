
// const fs = require('fs');
import * as fs from 'fs';


async function fetchData() {
  const csv = await fetch('http://localhost:3000/OnePiece.csv').then(res => res.text());
  let arr = csv.split('\r\n').map(x => x.split(','));
  let firstData = arr.splice(0, 1)[0];
  firstData = firstData ? firstData : [];

  const data = {
    arr,
    firstData
  };

  fs.writeFileSync('data.json', JSON.stringify(data));
}

fetchData();
