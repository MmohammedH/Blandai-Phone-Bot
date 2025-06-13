# Bland.ai Voice-Based OTC Trading Bot

This project is a minimalist Node.js backend that simulates an Over-The-Counter (OTC) crypto trading desk using voice interaction via the [Bland.ai](https://docs.bland.ai/) platform. It allows users to select an exchange, a trading symbol, view the current price, and input order details through a voice-based conversation.

---

## 📦 Project Structure

```
bland-trading-bot/
├── server.js                 # Main Express server setup
├── routes/
│   └── blandWebhook.js      # Route to receive Bland.ai webhook events
├── services/
│   ├── exchangeService.js   # Functions to fetch symbols and prices from exchanges
│   └── blandService.js      # Voice logic handling & session management
├── public/
│   └── index.html           # Minimal frontend UI
├── .env.example             # Sample env file
├── package.json             # Dependencies and scripts
└── README.md                # Project documentation
```

---

## 🚀 Getting Started

### 1. **Clone the repository**

```bash
https://github.com/your-username/bland-trading-bot.git
cd bland-trading-bot
```

### 2. **Install dependencies**

```bash
npm install
```

### 3. **Configure Environment Variables**

Create a `.env` file in the root directory:

```env
BLAND_API_KEY=your_bland_api_key
```

### 4. **Run the server**

```bash
node server.js
```

The server will start at `http://localhost:3000`

---

## 🧠 Voice Interaction Flow

The bot guides the user through a trading flow:

1. **Exchange Selection**: User chooses one from Binance, OKX, Bybit, or Deribit.
2. **Symbol Input**: User states the trading pair (e.g., BTCUSDT).
3. **Price Display**: The bot fetches and says the current market price.
4. **Order Details**: User specifies quantity.
5. **Confirmation**: Bot repeats the full order info.

---

## 🔗 API Integration

* **Bland.ai**: Used to receive and respond to user speech via webhook.
* **Exchange Public APIs**:

  * Binance: `https://api.binance.com/api/v3/exchangeInfo`
  * OKX: `https://www.okx.com/api/v5/public/instruments`
  * Bybit: `https://api.bybit.com/v5/market/instruments-info`
  * Deribit: `https://www.deribit.com/api/v2/public/get_instruments`

---

## ⚙️ Voice Event Handling

The webhook receives messages from Bland.ai and responds based on conversation state:

* Missing exchange → prompt for exchange
* Missing symbol → prompt for trading pair
* Missing quantity → prompt for number
* Confirm details → finalize interaction

State is tracked using a basic in-memory object.

---

## 🧪 Testing

* You can manually send POST requests to `/bland-webhook` to simulate conversation.
* Or use Bland.ai dashboard to send live events.

---

## 📽️ Video Demonstration Guide

Your video should:

* Walk through the code (e.g., `blandService.js`, `exchangeService.js`)
* Show how the conversation progresses
* End with a sample full flow (Exchange → Symbol → Price → Qty → Confirmation)

---

## 📄 Submission Instructions

* Email To: `careers@goquant.io`
* CC: `himanshu.vairagade@goquant.io`
* Subject: `Backend Assignment - Blandai Phone Bot`
* Attach:

  * ✅ Source code (ZIP or GitHub link)
  * ✅ Resume (PDF)
  * ✅ Video demo (link or attachment)
  * ✅ README file (this one)

---

## ✅ Done!

You're all set. If you want help creating the final ZIP or recording the walkthrough, just ask.
