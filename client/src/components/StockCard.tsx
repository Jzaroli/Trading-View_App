import { Link } from 'react-router-dom';

import { StockData } from '../interfaces/StockData.tsx';
import { ApiMessage } from '../interfaces/ApiMessage';
import { MouseEventHandler } from 'react';

interface StockCardProps {
  stock: StockData;
  deleteStock: (stockId: number) => Promise<ApiMessage>
}

const StockCard = ({ stock, deleteStock }: StockCardProps) => {

  const handleDelete: MouseEventHandler<HTMLButtonElement> = async (event) => {
    const stockId = Number(event.currentTarget.value);
    if (!isNaN(stockId)) {
      try {
        const data = await deleteStock(stockId);
        return data;
      } catch (error) {
        console.error('Failed to delete ticket:', error);
      }
    }
  };

  return (
    <div className='ticket-card'>
      <h3>{stock.symbol}</h3>
      <p>{stock.status}</p>
      <p>{stock.assignedUser?.username}</p>
      <Link to='/edit' state={{id: stock.id}} type='button' className='editBtn'>Edit</Link>
      <button type='button' value={String(stock.id)} onClick={handleDelete} className='deleteBtn'>Delete</button>
    </div>
  );
};

export default StockCard;
