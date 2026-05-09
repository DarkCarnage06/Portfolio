const express = require('express');
const fs = require('fs').promises;
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;
const dataDir = path.join(__dirname, 'data');
const dataPath = path.join(dataDir, 'messages.json');

app.use(express.json());
app.use('/assets', express.static(path.join(__dirname, 'assets')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.post('/api/contact', async (req, res) => {
  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ error: 'Name, email and message are required.' });
  }

  const entry = {
    id: Date.now(),
    name,
    email,
    message,
    receivedAt: new Date().toISOString()
  };

  try {
    await fs.mkdir(dataDir, { recursive: true });
    const raw = await fs.readFile(dataPath, 'utf8').catch(() => '[]');
    const messages = JSON.parse(raw || '[]');
    messages.push(entry);
    await fs.writeFile(dataPath, JSON.stringify(messages, null, 2), 'utf8');
    return res.status(200).json({ success: true });
  } catch (error) {
    console.error('Contact form save error:', error);
    return res.status(500).json({ error: 'Unable to save message.' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
