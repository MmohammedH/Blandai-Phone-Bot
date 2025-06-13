const express = require('express');
const router = express.Router();
const { handleBlandWebhook } = require('../services/blandService');

const apiKey = process.env.BLAND_API_KEY;

router.post('/', async (req, res) => {
  const auth = req.headers['authorization'];
  
  if (auth !== `Bearer ${apiKey}`) {
    return res.status(403).json({ error: 'Unauthorized' });
  }

  const reply = await handleBlandWebhook(req.body);
  res.json(reply);
});

module.exports = router;
