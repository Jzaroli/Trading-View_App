import { Request, Response } from 'express';
import { Stock } from '../models/stock.js';
import { User } from '../models/user.js';

// GET /stocks
export const getAllStocks = async (_req: Request, res: Response) => {
    try {
      const stocks = await Stock.findAll({
        include: [
          {
            model: User,
            as: 'assignedUser', // This should match the alias defined in the association
            attributes: ['username'], // Include only the username attribute
          },
        ],
      });
      res.json(stocks);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  };

// GET /stocks/:id
export const getStockById = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
      const stock = await Stock.findByPk(id, {
        include: [
          {
            model: User,
            as: 'assignedUser', // This should match the alias defined in the association
            attributes: ['username'], // Include only the username attribute
          },
        ],
      });
      if (stock) {
        res.json(stock);
      } else {
        res.status(404).json({ message: 'Stock not found' });
      }
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  };

// POST /stocks
export const createStock = async (req: Request, res: Response) => {
    const { symbol, assignedUserId } = req.body;
    try {
      const newStock = await Stock.create({ symbol, assignedUserId });
      res.status(201).json(newStock);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  };

// PUT /stocks/:id
export const updateStock = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { symbol, assignedUserId } = req.body;
    try {
      const stock = await Stock.findByPk(id);
      if (stock) {
        stock.symbol = symbol;
        stock.assignedUserId = assignedUserId;
        await stock.save();
        res.json(stock);
      } else {
        res.status(404).json({ message: 'Stock not found' });
      }
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  };

// DELETE /tickets/:id
export const deleteStock = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
      const stock = await Stock.findByPk(id);
      if (stock) {
        await stock.destroy();
        res.json({ message: 'Stock deleted' });
      } else {
        res.status(404).json({ message: 'Stock not found' });
      }
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  };
  