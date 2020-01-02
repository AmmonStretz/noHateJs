const express = require('express');

const app = express();
const axios = require('axios');
const fs = require('fs');
const csv = require('csv-parser');
const port = 3000;
const bodyParser = require('body-parser');

let testData = [];

requestToApi = async (start, end, index = 0) => {
  let body = [];
  testData.slice(start, end + 1).forEach(data => {
    body.push({ text: data.text });
  });
  try {
    const res = await axios.post(
      'https://demo.datexis.com/nohate-farm-fu/models/1/inference',
      {
        input: body
      }
    );
    for (let i = 0; i < res.data.predictions.length; i++) {
      testData[i + start].probability = res.data.predictions[i].probability;
      testData[i + start].prediction =
        res.data.predictions[i].label == 'hate' ? '1' : '0';
    }
  } catch(err) {
    if(index < 2) {
      console.log('retry', index);
      await requestToApi(start, end, index+1);
    } else {
      console.log('retry too often');
      
    }
  }
};
writeToFile = (start, end) => {
  fs.writeFile(
    'output.json',
    JSON.stringify(testData.slice(start, end + 1)),
    'utf8',
    err => {
      if (err) {
        console.log('An error occured while writing JSON Object to File.');
        return console.log(err);
      }
      console.log('JSON file has been saved.');
    }
  );
};

console.clear();
let write = true;
if (write) {
  fs.createReadStream('./nohate_testset.csv')
    .pipe(csv())
    .on('data', data => {
      try {
        testData.push(data);
      } catch (err) {
        console.log(err);
      }
    })
    .on('end', () => {
      console.log('CSV LOADED');
      const sampleSize = 80;
      const maxSample = 700;
      (async () => {
        try{
          for (let i = 0; i < testData.length && i < maxSample; i+= sampleSize) {
            console.log('Request from', i, 'to', i+sampleSize-1);
            let t0 = new Date().getTime();
            await requestToApi(i, i+sampleSize-1);
            console.log((new Date().getTime() - t0)/1000, 's');
            
          }
        } catch(err) {
          
        }
        writeToFile(0, maxSample);
        console.log('writeToFile from', 0, maxSample);
      })();
      // for (let i = 0; i < testData.length && i < maxSample; i+=sampleSize) {
      // }
    });
} else {
}
app.use(bodyParser.urlencoded());

app.use(bodyParser.json());

app.use(function(req, res, next) {
  var allowedOrigins = ['http://127.0.0.1:8080'];
  var origin = req.headers.origin;
  if (allowedOrigins.indexOf(origin) > -1) {
    res.setHeader('Access-Control-Allow-Origin', origin);
  }
  //res.header('Access-Control-Allow-Origin', 'http://127.0.0.1:8020');
  res.header('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.header('Access-Control-Allow-Credentials', true);
  return next();
});

app.post('/model', (req, res) => {
  // console.log(req.body.sampleSize);
  // console.log(testData);

  let body = [];
  for (let i = 0; i < req.body.sampleSize; i++) {
    body.push({ text: testData[i].text });
  }

  axios
    .post('https://demo.datexis.com/nohate-farm-fu/models/1/inference', {
      input: body
    })
    .then(response => {
      let r = [];
      for (let i = 0; i < req.body.sampleSize; i++) {
        r.push(testData[i]);
        r[i].predicted = response.data.predictions[i].label;
        r[i].prediction = response.data.predictions[i].prediction;
      }
      res.send(r);
    })
    .catch(error => {
      console.error(error);
      res.send(error);
    });
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
