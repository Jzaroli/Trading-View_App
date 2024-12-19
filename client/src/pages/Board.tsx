import { useState, useLayoutEffect, ChangeEvent, FormEvent } from 'react';
// import { Link } from 'react-router-dom';
import Login from './Login.tsx'
import auth from '../utils/auth';
import { searchAlpacaSymbol } from '../api/alpacaAPI';


const DashBoard = () => {

  const [loginCheck, setLoginCheck] = useState(false);
  const [stockSymbol, setStockSymbol] = useState('');

  const checkLogin = () => {
    if(auth.loggedIn()) {
      setLoginCheck(true);
    }
  };
  
  useLayoutEffect(() => {
    checkLogin();
  }, []);

// Searches for stock based on symbol
  const searchStock = async (e: FormEvent) => {
    e.preventDefault();
    try {
        const data = await searchAlpacaSymbol(stockSymbol);
    if (data) {  
        console.log(data);
        console.log('Found Stock');
    } else {
        console.log('No stocks found');
    }
    } catch (error) {
        console.error('Error fetching stocks:', error);
    }
    };  

const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const {value} = e.target;
    setStockSymbol(value);
    // console.log(stockSymbol);
}

  return (
    <>
    {
      !loginCheck ? (
        <div className='login-notice'>
          <h1>
            Login to create & view stocks!
          </h1>
          <Login />
        </div>  
      ) : (
        <div>
            <form className='form'onSubmit={searchStock}  >
                <label>Stock Symbol</label>
                <input 
                    type='text'
                    name='symbol'
                    value={stockSymbol || ''}
                    onChange={handleChange}
                    required
                />
                <button type='submit'>Search</button>
            </form>
        </div>
        )
    }
    </>
  );
};

export default DashBoard;


// import { getAllStocks } from '../api/stockAPI';
// import ErrorPage from './ErrorPage';
// import { ApiMessage } from '../interfaces/ApiMessage';
// import { StockData } from '../interfaces/StockData.tsx';

//   const [stocks, setStocks] = useState<StockData[]>([]);
//   const [error, setError] = useState(false);

//   const fetchStocks = async () => {
//     try {
//       const data = await getAllStocks();
//       setStocks(data);
//     } catch (err) {
//       console.error('Failed to retrieve stocks:', err);
//       setError(true);
//     }
//   };

//   useEffect(() => {
//     if(loginCheck) {
//         fetchStocks();
//         console.log(stocks);
//     }
//     }, [loginCheck]);
// if (error) {
//     return <ErrorPage />;
//   }

//   const deleteIndvTicket = async (ticketId: number) : Promise<ApiMessage> => {
//     try {
//       const data = await deleteTicket(ticketId);
//       fetchTickets();
//       return data;
//     } catch (err) {
//       return Promise.reject(err);
//     }
//   }