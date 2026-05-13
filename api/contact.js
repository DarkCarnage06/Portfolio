/**
 * Vercel serverless handler (plain Node req/res — no Express helpers).
 */
module.exports = async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  const sendJson = (statusCode, payload) => {
    res.statusCode = statusCode;
    res.setHeader('Content-Type', 'application/json; charset=utf-8');
    res.end(JSON.stringify(payload));
  };

  if (req.method === 'OPTIONS') {
    res.statusCode = 200;
    res.end();
    return;
  }

  if (req.method !== 'POST') {
    sendJson(405, { error: 'Method not allowed' });
    return;
  }

  let name;
  let email;
  let message;

  try {
    const chunks = [];
    for await (const chunk of req) {
      chunks.push(chunk);
    }
    const rawBody = Buffer.concat(chunks).toString('utf8');
    if (!rawBody) {
      sendJson(400, { error: 'Request body is required.' });
      return;
    }
    const parsed = JSON.parse(rawBody);
    name = typeof parsed.name === 'string' ? parsed.name.trim() : '';
    email = typeof parsed.email === 'string' ? parsed.email.trim() : '';
    message = typeof parsed.message === 'string' ? parsed.message.trim() : '';
  } catch (error) {
    console.error('Contact form parse error:', error);
    sendJson(400, { error: 'Invalid JSON body.' });
    return;
  }

  if (!name || !email || !message) {
    sendJson(400, { error: 'Name, email and message are required.' });
    return;
  }

  console.log('New contact message:', {
    name,
    email,
    messagePreview: message.slice(0, 80),
    timestamp: new Date().toISOString()
  });

  sendJson(200, {
    success: true,
    message: 'Message received successfully!'
  });
};
