const { getPrice } = require('./exchangeService');
const sessions = {}; // sessionId -> { exchange, symbol, quantity, price }

function reply(message) {
  return {
    response: { message },
    end_interaction: false
  };
}

function extractCorrection(input) {
  const corrections = [
    { field: 'exchange', keywords: ['exchange', 'binance', 'okx', 'bybit', 'deribit'] },
    { field: 'symbol', keywords: ['btc', 'eth', 'usdt', 'symbol', 'pair'] },
    { field: 'quantity', keywords: ['quantity', 'units', 'amount', 'number'] }
  ];
  for (const { field, keywords } of corrections) {
    if (keywords.some(k => input.includes(k))) return field;
  }
  return null;
}

exports.handleBlandWebhook = async (payload) => {
  const { session_id, user_input } = payload;
  if (!sessions[session_id]) sessions[session_id] = {};

  const session = sessions[session_id];
  const input = user_input.toLowerCase();

  // --- Handle corrections like "I meant Binance"
  if (input.includes('i meant') || input.includes('change') || input.includes('correction')) {
    const field = extractCorrection(input);
    session[field] = undefined;
  }

  // --- Exchange
  if (!session.exchange) {
    const exchanges = ['binance', 'okx', 'bybit', 'deribit'];
    const selected = exchanges.find(ex => input.includes(ex));
    if (selected) {
      session.exchange = selected;
      if (session.symbol) return reply(`Okay. You selected ${selected}. Let me re-check price for ${session.symbol}.`);
      return reply(`Great! Now tell me the trading pair, like BTCUSDT.`);
    }
    return reply(`Please tell me which exchange you'd like to use: Binance, OKX, Bybit, or Deribit.`);
  }

  // --- Symbol
  if (!session.symbol) {
    const possible = input.match(/[a-zA-Z]{3,10}/g)?.[0]?.toUpperCase();
    if (possible) {
      session.symbol = possible;
      const price = await getPrice(session.exchange, session.symbol);
      if (!price) {
        session.symbol = undefined;
        return reply(`Invalid trading symbol. Please say something like BTCUSDT.`);
      }
      session.price = price;
      if (session.quantity) {
        return reply(`Order confirmed: ${session.quantity} ${session.symbol} at ${price} on ${session.exchange}.`);
      }
      return reply(`Price of ${session.symbol} is ${price}. How many units would you like to buy?`);
    }
    return reply(`Please say the symbol you want to trade, like BTCUSDT.`);
  }

  // --- Quantity
  if (!session.quantity) {
    const quantity = parseFloat(input);
    if (!isNaN(quantity)) {
      session.quantity = quantity;
      return reply(`Order confirmed: ${quantity} ${session.symbol} at ${session.price} on ${session.exchange}.`);
    }
    return reply(`Please say how many units you'd like to buy (e.g., 2 or 0.5).`);
  }

  return reply(`Thanks! You can start a new session to try again.`);
};
