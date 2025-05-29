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

## 🗂️ File Structure (on Glitch)

├── server.js # Express server handling incoming webhook calls  
├── .env # Stores access tokens and verification secrets 
├── package.json # Project metadata and dependencies 
└── glitch.json # Glitch project config (optional)


## 🚀 Getting Started

To test this bot:

1. Set up your **Meta Developer Account** and connect a phone number.
2. Create your WhatsApp Business App and configure webhooks.
3. Deploy your webhook endpoint on Glitch (or any Node.js host).
4. Replace your access token and verification token in `.env`.
5. Create required message templates and get them approved.
6. Trigger messages via `POST` calls or from WhatsApp Sandbox UI.

---

## 🌱 Future Improvements

- Add database logging to store user responses
- Handle fallbacks and incorrect inputs more gracefully
- Expand conversation flow with more branches
- Integrate with Dialogflow or a real NLP model

---

## ⚠️ Note

This was built primarily as an educational experiment to learn how to work with WhatsApp Cloud API and webhooks. It’s not a production-grade chatbot.

---

## 🧑‍💻 Author

Built by **Rakshit Bansal** — learning and exploring how APIs and messaging platforms connect.  
Feel free to fork or suggest improvements!


