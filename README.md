# WhatsApp Cloud API – Education Info Chatbot

This project is a simple WhatsApp chatbot that collects basic education-related information using the Meta WhatsApp Cloud API. It was built as part of an assignment to explore webhook handling, template messaging, and API integration using Meta for Developers.

---

## 📌 What It Does

The bot initiates a short conversation with the user and asks:

1. Whether the user has completed their graduation (Yes/No buttons)
2. Based on the response:
   - If **Yes**, it follows up by asking what degree they completed (with button options like B.Tech, B.Com, etc.).
   - If **No**, it asks the user to manually type their highest qualification.

After each interaction, the bot responds with a polite thank-you message and acknowledges the input.

---

## 🔧 How It Works

- The bot uses **WhatsApp Cloud API** via Meta for Developers.
- Templates are created inside the Meta Business Suite to send structured messages with quick-reply buttons.
- A webhook endpoint (built and hosted on **Glitch**) receives and responds to messages.
- The webhook handles:
  - Verifying the token and endpoint handshake
  - Listening to incoming user interactions
  - Sending dynamic responses based on user's replies

---

## 💻 Tech Stack

- WhatsApp Cloud API (Meta for Developers)
- Webhooks (Node.js + Express, hosted on Glitch)
- JSON message handling for templates and replies

---



