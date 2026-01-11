# EXPORTS.md

> **Purpose:** This file contains portable prompts that can be dropped into other projects. Each export describes a pattern or component at a high level, letting the AI adapt implementation details to the target codebase.

---

## FAQ Section with AI Chatbot

Create an FAQ section that pairs clickable question pills with an inline AI chatbot.

**Layout:**
- Section header with eyebrow, headline, and subheadline
- Grid of FAQ question pills (2 columns on desktop)
- Embedded chat panel below

**Behavior:**
- Clicking a question pill sends it directly to the chatbot and scrolls the chat into view
- Users can also type their own questions
- Chat history persists in localStorage across page loads
- Welcome message changes based on the current page context
- "Clear" button resets the conversation

**Chat UI:**
- Message bubbles styled differently for user vs assistant
- Typing indicator (animated dots) while waiting for response
- Header with avatar/icon, brand name, and online status indicator
- Markdown rendering in assistant responses
- Support for inline action buttons in AI responses (parsed from a special syntax like `[ACTION:Label](/path)`)

**Polish:**
- Smooth animations on new messages
- Dark mode support
- Modern styling with rounded corners, subtle shadows, and glass-effect surfaces

---

*Add more exports below as needed.*
