import express from "express";
import axios from "axios";

const app = express();
app.use(express.json());

const {
  WEBHOOK_VERIFY_TOKEN,
  GRAPH_API_TOKEN,
  PORT = 3000,
  PHONE_NUMBER_ID,
} = process.env;

const userState = {}; // Store user states temporarily in memory

const API_BASE_URL = "https://graph.facebook.com/v18.0";

// 🔁 Send a message using a template
async function sendTemplate(to, templateName, components = []) {
  await axios.post(
    `${API_BASE_URL}/${PHONE_NUMBER_ID}/messages`,
    {
      messaging_product: "whatsapp",
      to,
      type: "template",
      template: {
        name: templateName,
        language: { code: "en_US" },
        components,
      },
    },
    {
      headers: {
        Authorization: `Bearer ${GRAPH_API_TOKEN}`,
        "Content-Type": "application/json",
      },
    }
  );
  console.log(`📤 Sent template "${templateName}" to ${to}`);
}

// ✅ Send a regular text message
async function sendText(to, text) {
  await axios.post(
    `${API_BASE_URL}/${PHONE_NUMBER_ID}/messages`,
    {
      messaging_product: "whatsapp",
      to,
      type: "text",
      text: { body: text },
    },
    {
      headers: {
        Authorization: `Bearer ${GRAPH_API_TOKEN}`,
        "Content-Type": "application/json",
      },
    }
  );
  console.log(`📤 Sent text to ${to}: "${text}"`);
}

// 🌐 Webhook verification
app.get("/webhook", (req, res) => {
  const mode = req.query["hub.mode"];
  const token = req.query["hub.verify_token"];
  const challenge = req.query["hub.challenge"];

  if (mode === "subscribe" && token === WEBHOOK_VERIFY_TOKEN) {
    console.log("✅ Webhook verified!");
    res.status(200).send(challenge);
  } else {
    res.sendStatus(403);
  }
});

app.post("/webhook", async (req, res) => {
  const body = req.body;

  if (body.object === "whatsapp_business_account") {
    for (const entry of body.entry) {
      const changes = entry.changes;
      for (const change of changes) {
        const value = change.value;

        if (value.messages) {
          for (const message of value.messages) {
            const from = message.from;
            const msgType = message.type;
            if (!userState[from]) userState[from] = {};
            const user = userState[from];

            console.log(
              "📩 Received webhook:",
              JSON.stringify(message, null, 2)
            );

            // Handle text messages
            if (msgType === "text") {
              const text = message.text.body.toLowerCase();
              const isGreeting = ["hi", "hello", "hey"].includes(text);

              if (!user.stage || (user.stage === "done" && isGreeting)) {
                await sendTemplate(from, "graduation");
                userState[from] = { stage: "graduation" };
              } else if (user.stage === "nodegree") {
                // User entered a course after selecting "No"
                await sendText(
                  from,
                  `Thanks! We've recorded your course: "${text.toUpperCase()}"`
                );
                userState[from] = { stage: "done", course: text };
              }
            }

            // Handle button replies
            if (msgType === "button") {
              const payload = message.button.payload;
              console.log(`🖲️ Button clicked: ${payload} by ${from}`);

              if (user.stage === "graduation") {
                if (payload === "Yes") {
                  await sendTemplate(from, "degree"); // send degree template
                  userState[from] = { stage: "degree" };
                } else if (payload === "No") {
                  await sendTemplate(from, "nodegree"); // send nodegree template
                  userState[from] = { stage: "nodegree" };
                }
              } else if (user.stage === "degree") {
                await sendText(from, "Thank you for the information!");
                userState[from] = { stage: "done" };
              } else if (user.stage === "nodegree") {
                await sendText(from, "Thank you for the information!");
                userState[from] = { stage: "done" };
              }
            }
          }
        }
      }
    }

    res.sendStatus(200);
  } else {
    res.sendStatus(404);
  }
});

// 🚀 Start server
app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});
