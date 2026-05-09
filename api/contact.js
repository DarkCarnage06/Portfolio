const fs = require('fs').promises;
const path = require('path');

export default async function handler(req, res) {
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

  try {
    const { name, email, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({ error: 'Name, email and message are required.' });
    }

    // For Vercel, we can't write to the filesystem permanently
    // Instead, we'll use Vercel's environment or a database
    // For now, we'll just return success and log the message
    console.log('New contact message:', { name, email, message, timestamp: new Date().toISOString() });

    // You can integrate with a service like:
    // - SendGrid for email notifications
    // - Airtable, Supabase, or MongoDB for storage
    // - Slack webhook for notifications

    return res.status(200).json({
      success: true,
      message: 'Message received successfully!'
    });

  } catch (error) {
    console.error('Contact form error:', error);
    return res.status(500).json({ error: 'Unable to process message.' });
  }
}