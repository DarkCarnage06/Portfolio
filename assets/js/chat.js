const chatState = {
  open: false,
  messages: [],
  loading: false,
  pending: false
};

const suggestedPrompts = [
  'Tell me about Atharv',
  'Show AI projects',
  'What technologies does he know?',
  'Why should we hire him?'
];

function createChatApp() {
  const fab = document.createElement('button');
  fab.className = 'chat-fab';
  fab.innerHTML = '<i class="bx bx-message-detail"></i>';
  fab.setAttribute('aria-label', 'Open portfolio assistant');

  const windowEl = document.createElement('div');
  windowEl.className = 'chat-window';
  windowEl.innerHTML = `
    <div class="chat-header">
      <div class="chat-title-row">
        <div style="display:flex; align-items:center; gap:0.75rem;">
          <div class="chat-avatar">A</div>
          <div>
            <div style="font-weight:700;">Atharv AI</div>
            <div style="font-size:0.8rem; color:#475569;">Portfolio guide</div>
          </div>
        </div>
        <button class="chat-pill" id="chat-close" type="button">Close</button>
      </div>
    </div>
    <div class="chat-body" id="chat-body"></div>
    <div class="chat-input-row">
      <input id="chat-input" class="chat-input" placeholder="Ask about projects, skills, experience..." />
      <button id="chat-send" class="chat-send" type="button">Send</button>
    </div>
  `;

  document.body.appendChild(fab);
  document.body.appendChild(windowEl);

  const body = windowEl.querySelector('#chat-body');
  const input = windowEl.querySelector('#chat-input');
  const sendButton = windowEl.querySelector('#chat-send');
  const closeButton = windowEl.querySelector('#chat-close');

  function renderMessage(role, content) {
    const wrapper = document.createElement('div');
    wrapper.className = `chat-message ${role}`;
    wrapper.innerHTML = content;
    body.appendChild(wrapper);
    body.scrollTop = body.scrollHeight;
    return wrapper;
  }

  function renderWelcome() {
    body.innerHTML = '';
    renderMessage('assistant', `Hi! I'm Atharv AI 👋<br/><br/>I'm your AI guide to Atharv's portfolio. Ask me anything about his projects, skills, experience, education, or technologies.`);
    const suggestionRow = document.createElement('div');
    suggestionRow.className = 'chat-suggested';
    suggestedPrompts.forEach((prompt) => {
      const pill = document.createElement('button');
      pill.className = 'chat-pill';
      pill.type = 'button';
      pill.textContent = prompt;
      pill.addEventListener('click', () => sendMessage(prompt));
      suggestionRow.appendChild(pill);
    });
    body.appendChild(suggestionRow);
    body.scrollTop = 0;
  }

  function showTyping() {
    const typing = document.createElement('div');
    typing.className = 'chat-typing';
    typing.id = 'chat-typing';
    typing.innerHTML = '<span></span><span></span><span></span>';
    body.appendChild(typing);
    body.scrollTop = body.scrollHeight;
  }

  function hideTyping() {
    const typing = document.getElementById('chat-typing');
    if (typing) typing.remove();
  }

  async function sendMessage(message) {
    const value = (message || input.value).trim();
    if (!value || chatState.loading) return;

    input.value = '';
    chatState.loading = true;
    chatState.messages.push({ role: 'user', message: value });
    renderMessage('user', value);
    showTyping();

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: value, history: chatState.messages })
      });

      hideTyping();
      if (!response.ok) {
        throw new Error('Unable to respond');
      }

      const assistantMessage = renderMessage('assistant', '');
      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let reply = '';

      while (true) {
        const { value, done } = await reader.read();
        if (done) break;
        const chunk = decoder.decode(value, { stream: true });
        if (chunk) {
          reply += chunk;
          assistantMessage.innerHTML = reply.replace(/\n/g, '<br/>');
          body.scrollTop = body.scrollHeight;
        }
      }

      chatState.messages.push({ role: 'assistant', message: reply || "I couldn't find that information in Atharv's portfolio." });
    } catch (error) {
      hideTyping();
      renderMessage('assistant', error.message || 'Unable to respond right now.');
    } finally {
      chatState.loading = false;
    }
  }

  sendButton.addEventListener('click', () => sendMessage());
  input.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      sendMessage();
    }
  });

  fab.addEventListener('click', () => {
    chatState.open = !chatState.open;
    windowEl.classList.toggle('is-open', chatState.open);
    if (chatState.open && chatState.messages.length === 0) {
      renderWelcome();
    }
  });

  closeButton.addEventListener('click', () => {
    chatState.open = false;
    windowEl.classList.remove('is-open');
  });
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', createChatApp);
} else {
  createChatApp();
}
