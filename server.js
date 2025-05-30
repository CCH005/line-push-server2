// server.js
const express = require('express');
const axios = require('axios');
const app = express();
app.use(express.json());

app.post('/push', async (req, res) => {
  const { token, to, message } = req.body;

  if (!token || !to || !message) {
    return res.status(400).send("❌ Missing required fields: token, to, message");
  }

  try {
    await axios.post('https://api.line.me/v2/bot/message/push', {
      to: to,
      messages: [
        {
          type: 'text',
          text: message
        }
      ]
    }, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    });

    res.status(200).send("✅ Message sent to LINE");
  } catch (err) {
    console.error("LINE error:", err.response?.data || err.message);
    res.status(500).send("❌ Failed to send message");
  }
});

app.get('/', (req, res) => {
  res.send("LINE Push API Server Running");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`✅ Server is running on port ${PORT}`);
});
