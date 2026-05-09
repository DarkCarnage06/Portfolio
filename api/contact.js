module.exports = async function handler(req, res) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  let name;
  let email;
  let message;

  try {
    if (req.body && typeof req.body === 'object') {
      ({ name, email, message } = req.body);
    } else {
      const chunks = [];
      for await (const chunk of req) {
        chunks.push(chunk);
      }
      const rawBody = Buffer.concat(chunks).toString('utf8');
      if (!rawBody) {
        return res.status(400).json({ error: 'Request body is required.' });
      }
      const parsed = JSON.parse(rawBody);
      ({ name, email, message } = parsed);
    }
  } catch (error) {
    console.error('Contact form parse error:', error);
    return res.status(400).json({ error: 'Invalid JSON body.' });
  }

  if (!name || !email || !message) {
    return res.status(400).json({ error: 'Name, email and message are required.' });
  }

  console.log('New contact message:', { name, email, message, timestamp: new Date().toISOString() });

  return res.status(200).json({
    success: true,
    message: 'Message received successfully!'
  });
};