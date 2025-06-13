const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
require('dotenv').config();

const app = express();
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

const blandWebhook = require('./routes/blandWebhook');
app.use('/bland-webhook', blandWebhook);

app.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});