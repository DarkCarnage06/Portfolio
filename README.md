# Atharv Randive — Developer Portfolio

Pixel-accurate, high-performance developer portfolio built with Next.js 14 (App Router), TypeScript, Tailwind CSS, Framer Motion, and Lenis smooth scrolling.

Live URL: [https://portfolio-pc3d.vercel.app](https://portfolio-pc3d.vercel.app)

---

## 🚀 Features

- **Custom 3D Cursor**:
  - Pointer arrow derived from 3D asset with trailing disc follower (`lerp ~0.15`).
  - Active states on links, buttons, and cards (disc expansion, arrow tilt, squish on mousedown).
  - Subtle click ripple ring in `#5B9BD0`.
  - Automatically disabled on touch devices and falls back cleanly if JS is disabled or when hovering over inputs.
  - Respects `prefers-reduced-motion`.
- **Motion & Graphics**:
  - Hero staggered entrance animation (badge -> word-by-word headline -> bio -> buttons -> tech icons).
  - Rotating role text under headline ("AI/ML Developer", "RAG Systems Builder", "Computer Vision Enthusiast", "Full-Stack Builder").
  - Subtle HTML canvas constellation / particle background with gentle mouse interaction.
  - Floating code card that bobs gently with line-by-line typing animation.
  - 3D card tilt effect with cursor-following specular glare and glowing gradient border.
  - Magnetic pull button effect (`MagneticButton`) with shine sweep hover.
  - Animated top scroll progress bar in accent gradient.
  - Number counter animation on stats.
  - Smooth inertia scrolling via Lenis with working anchor navigation.
- **AI Portfolio Chatbot ("Ask Atharv")**:
  - Floating round launcher with pulse ring.
  - Glass-dark drawer matching theme palette with suggested question chips.
  - Real-time token streaming with typing indicator and formatted markdown.
  - Guardrail defense in depth: strictly answers only about Atharv's verified background, refuses general coding requests, jokes, and prompt injection attempts.
  - Built-in deterministic knowledge fallback engine ensuring 100% test coverage even without remote keys.
  - IP-based rate limiting (15 req/min, 100 req/day) and conversation history management.

---

## ⚙️ Environment Variables (Vercel)

Set any one of the following LLM API keys in your **Vercel Project Settings > Environment Variables**:

| Variable Name | Required | Description |
| :--- | :--- | :--- |
| `ANTHROPIC_API_KEY` | Optional* | Anthropic API key for Claude 3 Haiku streaming responses |
| `GEMINI_API_KEY` | Optional* | Google Gemini API key for Gemini 1.5 Flash streaming responses |
| `OPENAI_API_KEY` | Optional* | OpenAI API key for GPT-4o-mini streaming responses |

*\*Note: If none of the external keys are configured, the chatbot automatically uses the built-in deterministic local knowledge engine powered by `/data/knowledge.ts`. All test cases and knowledge questions work seamlessly out-of-the-box.*

---

## 🛠 Local Development

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Run production build
npm run build

# Run chatbot guardrails test suite
node scripts/test-chatbot.js
```
