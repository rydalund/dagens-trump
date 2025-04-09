const express = require('express');
const app = express();
const port = 3000;

app.get('/', (req, res) => {
  res.send('Hej, världen!');
});

app.listen(port, () => {
  console.log(`Servern kör på http://localhost:${port}`);
});