import StockCard from './StockCard';
import { StockData } from '../interfaces/StockData';
import { ApiMessage } from '../interfaces/ApiMessage';

interface SwimlaneProps {
  title: string;
  stocks: StockData[];
  deleteStock: (stocksId: number) => Promise<ApiMessage>
}

const Swimlane = ({ title, stocks, deleteStock }: SwimlaneProps) => {
  const getStatusClass = (status: string) => {
    switch (status) {
      case 'Todo':
        return 'swim-lane todo';
      case 'In Progress':
        return 'swim-lane inprogress';
      case 'Done':
        return 'swim-lane done';
      default:
        return 'swim-lane';
    }
  };

  return (
    <div className={`swimlane ${getStatusClass(title)}`}>
      <h2>{title}</h2>
      {stocks.map(stock => (
        <StockCard 
          key={stock.id}
          stock={stock}
          deleteStock={deleteStock}
        />
      ))}
    </div>
  );
};

export default Swimlane;
