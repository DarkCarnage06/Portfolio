const fs = require('fs').promises;
const path = require('path');

async function loadPortfolioContext() {
  const portfolioPath = path.join(__dirname, '..', '..', 'data', 'portfolio.json');
  const raw = await fs.readFile(portfolioPath, 'utf8');
  return JSON.parse(raw);
}

function buildContextChunks(portfolio) {
  const chunks = [];

  chunks.push(`Name: ${portfolio.name}`);
  chunks.push(`Title: ${portfolio.title}`);
  chunks.push(`Summary: ${portfolio.summary}`);
  chunks.push(`Hero: ${portfolio.hero?.headline} ${portfolio.hero?.summary}`);
  chunks.push(`About: ${portfolio.about?.summary}`);
  chunks.push(`Strengths: ${portfolio.about?.strengths?.join(', ')}`);
  chunks.push(`Skills languages: ${portfolio.skills?.languages?.join(', ')}`);
  chunks.push(`Skills frameworks: ${portfolio.skills?.frameworks?.join(', ')}`);
  chunks.push(`Skills AI: ${portfolio.skills?.ai?.join(', ')}`);
  chunks.push(`Skills databases: ${portfolio.skills?.databases?.join(', ')}`);
  chunks.push(`Skills tools: ${portfolio.skills?.tools?.join(', ')}`);
  chunks.push(`Education: ${portfolio.education?.degree} at ${portfolio.education?.institution}`);
  chunks.push(`Education details: ${portfolio.education?.summary}`);
  chunks.push(`Achievements: ${portfolio.achievements?.join(' | ')}`);
  chunks.push(`Contact email: ${portfolio.contact?.email}`);
  chunks.push(`GitHub: ${portfolio.contact?.github}`);
  chunks.push(`LinkedIn: ${portfolio.contact?.linkedin}`);

  portfolio.projects?.forEach((project, index) => {
    chunks.push(`Project ${index + 1}: ${project.name}. ${project.description}. Technologies: ${project.technologies?.join(', ')}. Highlights: ${project.highlights?.join(', ')}`);
  });

  portfolio.experience?.forEach((item, index) => {
    chunks.push(`Experience ${index + 1}: ${item.role}. ${item.description}. Technologies: ${item.technologies?.join(', ')}`);
  });

  return chunks;
}

function retrieveRelevantContext(question, chunks) {
  const lowered = question.toLowerCase();
  const relevant = chunks.filter((chunk) => {
    const text = chunk.toLowerCase();
    const keywords = [
      'project', 'skill', 'technology', 'python', 'react', 'next', 'docker', 'cloud', 'database', 'ai', 'ml',
      'experience', 'education', 'contact', 'github', 'linkedin', 'hire', 'interview', 'strength', 'about', 'resume'
    ];

    return keywords.some((keyword) => text.includes(keyword) && lowered.includes(keyword)) || text.includes('atharv');
  });

  if (relevant.length === 0) {
    return chunks.slice(0, 8);
  }

  return relevant.slice(0, 12);
}

module.exports = { loadPortfolioContext, buildContextChunks, retrieveRelevantContext };
