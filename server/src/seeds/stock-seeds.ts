import { Stock } from '../models/stock.js';

export const seedStocks = async () => {
  await Stock.bulkCreate([
    { symbol: 'TSLA', assignedUserId: 1 },
    { symbol: 'GOOG', assignedUserId: 1 },
  ]);
};
