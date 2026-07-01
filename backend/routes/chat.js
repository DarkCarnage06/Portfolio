const express = require('express');
const { chatRateLimiter } = require('../utils/rateLimiter');
const { chatRequestSchema, sanitizeMessage } = require('../utils/validators');
const { generateChatReply } = require('../services/openaiService');

const router = express.Router();

router.post('/api/chat', chatRateLimiter, async (req, res) => {
  try {
    const parsed = chatRequestSchema.safeParse(req.body);
    if (!parsed.success) {
      res.status(400).send('Please send a valid message.');
      return;
    }

    const message = sanitizeMessage(parsed.data.message);
    const history = parsed.data.history || [];

    res.setHeader('Content-Type', 'text/plain; charset=utf-8');
    res.setHeader('Cache-Control', 'no-cache');
    res.setHeader('Connection', 'keep-alive');
    res.flushHeaders?.();

    await generateChatReply({
      message,
      history,
      onChunk: (chunk) => {
        res.write(chunk);
      }
    });

    res.end();
  } catch (error) {
    console.error('Chat API error:', error);
    res.write(error.message || 'Unable to generate a response right now.');
    res.end();
  }
});

module.exports = router;
