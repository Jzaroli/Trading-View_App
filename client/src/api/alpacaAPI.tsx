const searchAlpacaSymbol = async (symbol: string) => {
    try {
        //Dynamic injection of the stock symbol and for now, other parameters are hardcoded:
        const response = await fetch(`https://data.alpaca.markets/v2/stocks/bars?symbols=${symbol}&timeframe=1H&start=2024-01-03T00%3A00%3A00Z&end=2024-01-03T23%3A00%3A00Z&limit=1000&adjustment=raw&feed=sip&sort=asc`, {
        headers: {
            accept: 'application/json',
            'APCA-API-KEY-ID': `${import.meta.env.VITE_APCA_API_KEY_ID}`,
            'APCA-API-SECRET-KEY': `${import.meta.env.VITE_APCA_API_SECRET_KEY}`,
            },
        });
        const data = await response.json();
        if (!response.ok) {
        throw new Error('invalid API response, check the network tab');
        }
        return data;
    } catch (err) {
        console.log('an error occurred', err);
        return {};
    }
};
  
  export { searchAlpacaSymbol };
  