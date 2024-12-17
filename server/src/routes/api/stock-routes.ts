import express from 'express';
import {
  getAllStocks,
  getStockById,
  createStock,
  updateStock,
  deleteStock,
} from '../../controllers/stock-controller.js';

const router = express.Router();

// GET /stocks - Get all stocks
router.get('/', getAllStocks);

// GET /stock/:id - Get a stock by id
router.get('/:id', getStockById);

// POST /stocks - Create a new stock
router.post('/', createStock);

// PUT /stocks/:id - Update a stock by id
router.put('/:id', updateStock);

// DELETE /stocks/:id - Delete a stock by id
router.delete('/:id', deleteStock);

export { router as stockRouter };
