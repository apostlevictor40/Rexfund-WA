const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const app = express();

dotenv.config();
app.use(cors());
app.use(bodyParser.json());

const PORT = process.env.PORT || 5000;

app.get('/', (req, res) => {
  res.send('Rexfunds backend is live');
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
