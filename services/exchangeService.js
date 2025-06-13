const axios = require('axios');

exports.getPrice = async (exchange, symbol) => {
  try {
    switch (exchange) {
      case 'binance': {
        const res = await axios.get(`https://api.binance.com/api/v3/ticker/price?symbol=${symbol}`);
        return res.data.price;
      }
      case 'okx': {
        const res = await axios.get(`https://www.okx.com/api/v5/market/ticker?instId=${symbol}`);
        return res.data.data[0].last;
      }
      case 'bybit': {
        const res = await axios.get(`https://api.bybit.com/v5/market/tickers?category=spot`);
        const item = res.data.result.list.find(i => i.symbol === symbol);
        return item ? item.lastPrice : null;
      }
      case 'deribit': {
        const res = await axios.get(`https://www.deribit.com/api/v2/public/ticker?instrument_name=${symbol}`);
        return res.data.result.last_price;
      }
    }
  } catch (e) {
    return null;
  }
};