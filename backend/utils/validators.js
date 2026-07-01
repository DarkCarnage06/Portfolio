const { z } = require('zod');

const chatRequestSchema = z.object({
  message: z.string().trim().min(1).max(500),
  history: z.array(z.object({ role: z.enum(['user', 'assistant']), message: z.string().trim().max(2000) })).optional()
});

function sanitizeMessage(message) {
  return message
    .replace(/\b(?:ignore|forget|system|assistant|developer)\b/gi, '')
    .replace(/(?:\r\n|\n|\t)/g, ' ')
    .trim();
}

module.exports = { chatRequestSchema, sanitizeMessage };
