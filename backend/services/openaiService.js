const OpenAI = require('openai');
const { portfolioPrompt } = require('../prompts/systemPrompt');
const { loadPortfolioContext, buildContextChunks, retrieveRelevantContext } = require('../rag/portfolioRag');

function getOpenAIClient() {
  const key = process.env.OPENAI_API_KEY;
  if (!key) return null;
  return new OpenAI({ apiKey: key });
}

function getGeminiApiKey() {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    throw new Error('Gemini API key is not configured.');
  }

  return apiKey;
}

function buildFallbackReply(message, portfolio) {
  const lower = message.toLowerCase();
  const knowRegex = /(what(?: does)?(?:\s+he|\s+atharv)?\s+(?:know|know about|know of)|what information(?: about)?\s+(?:atharv|him)|what does atharv know|what does he know)/i;
  if (knowRegex.test(lower)) {
    const langs = (portfolio.skills?.languages || []).join(', ');
    const frameworks = (portfolio.skills?.frameworks || []).join(', ');
    const ai = (portfolio.skills?.ai || []).join(', ');
    const dbs = (portfolio.skills?.databases || []).join(', ');
    const tools = (portfolio.skills?.tools || []).join(', ');
    return `Technical skills:\nLanguages: ${langs}\nFrameworks: ${frameworks}\nAI / ML: ${ai}\nDatabases: ${dbs}\nTools: ${tools}`;
  }
  if (lower.includes('who is') || lower.includes('tell me about atharv') || lower.includes('tell me about')) {
    return portfolio.about?.summary || "Atharv is an AI/ML developer building practical products for real-world problems.";
  }

  if (lower.includes('technology') || lower.includes('programming language') || lower.includes('framework') || lower.includes('database') || lower.includes('docker')) {
    const tech = [
      ...(portfolio.skills?.languages || []),
      ...(portfolio.skills?.frameworks || []),
      ...(portfolio.skills?.ai || []),
      ...(portfolio.skills?.databases || []),
      ...(portfolio.skills?.tools || [])
    ];
    return `Atharv works with ${tech.slice(0, 12).join(', ')}. ${portfolio.summary}`;
  }

  if (lower.includes('project') || lower.includes('ai project') || lower.includes('show ai')) {
    const projects = portfolio.projects?.map((project) => project.name).join(', ');
    return `Some of Atharv's projects include ${projects || 'several AI and full-stack builds'}.`;
  }

  if (lower.includes('education') || lower.includes('study')) {
    return `${portfolio.education?.degree} at ${portfolio.education?.institution}.`;
  }

  if (lower.includes('contact') || lower.includes('github') || lower.includes('linkedin')) {
    return `You can reach Atharv at ${portfolio.contact?.email || 'his portfolio contact form'} or visit ${portfolio.contact?.github || portfolio.contact?.linkedin}.`;
  }

  if (lower.includes('hire') || lower.includes('why should')) {
    return `Atharv is strong in machine learning, full-stack product building, and applied AI, with projects that span RAG systems, computer vision, and real-world web applications.`;
  }

  return "I couldn't find that information in Atharv's portfolio.";
}

async function generateChatReply({ message, history = [], onChunk }) {
  const portfolio = await loadPortfolioContext();
  const chunks = buildContextChunks(portfolio);
  const context = retrieveRelevantContext(message, chunks);

  const messages = [
    { role: 'system', content: `${portfolioPrompt}\n\nPortfolio context:\n${context.join('\n')}` },
    ...history.slice(-8).map((entry) => ({ role: entry.role, content: entry.message })),
    { role: 'user', content: message }
  ];

  const fallback = buildFallbackReply(message, portfolio);

  // Prefer OpenAI if configured (more stable across deployments). Fall back to Gemini if present.
  const openai = getOpenAIClient();
  if (openai) {
    try {
      if (onChunk) {
        const stream = await openai.responses.create({
          model: process.env.OPENAI_MODEL || 'gpt-4o-mini',
          input: messages,
          temperature: 0.3,
          stream: true
        });

        let reply = '';
        for await (const event of stream) {
          const delta = event?.delta || event?.output_text || '';
          const text = typeof delta === 'string' ? delta : (delta?.content || '');
          if (text) {
            reply += text;
            onChunk(text);
          }
        }

        return reply || fallback;
      }

      const response = await openai.responses.create({
        model: process.env.OPENAI_MODEL || 'gpt-4o-mini',
        input: messages,
        temperature: 0.3
      });

      return response.output_text || fallback;
    } catch (err) {
      console.warn('OpenAI request failed, falling back to other providers or portfolio.', err?.message || err);
      // continue to try Gemini or fallback
    }
  }

  // If OpenAI not available or failed, try Gemini if configured
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    if (onChunk) {
      onChunk(fallback);
    }
    return fallback;
  }

  const prompt = `${messages.map((entry) => `${entry.role === 'system' ? 'System' : entry.role === 'user' ? 'User' : 'Assistant'}: ${entry.content}`).join('\n')}\n\nAssistant:`;

  const response = await fetch(`https://generativelanguage.googleapis.com/v1/models/gemini-1.5:generateText?key=${apiKey}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      prompt,
      temperature: 0.3,
      maxOutputTokens: 700
    })
  });

  if (!response.ok) {
    console.warn(`Gemini request returned ${response.status} ${response.statusText} - falling back to portfolio reply.`);
    if (onChunk) onChunk(fallback);
    return fallback;
  }

  const data = await response.json();
  const reply = data?.candidates?.[0]?.content?.parts?.map((part) => part.text).join('') || data?.output?.[0]?.content || fallback;
  const sanitizedReply = String(reply).replace(/https?:\/\/platform\.openai\.com[^\s]*/gi, '[provider docs link removed]').replace(/OpenAI/gi, 'the model provider');

  if (onChunk) {
    for (const char of sanitizedReply) onChunk(char);
  }

  return sanitizedReply || fallback;
}

module.exports = { generateChatReply };
