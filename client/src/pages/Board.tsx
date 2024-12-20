import { useState, useLayoutEffect, ChangeEvent, FormEvent, useEffect} from 'react';
// import { Link } from 'react-router-dom';
import Login from './Login.tsx'
import auth from '../utils/auth';
import { searchAlpacaSymbol } from '../api/alpacaAPI';

interface stockBar {
    c: number;
    h: number;
    l: number;
    n: number;
    o: number;
    t: string;
    v: number;
    vw: number;
}

const DashBoard = () => {

  const [loginCheck, setLoginCheck] = useState(false);
  const [stockSymbol, setStockSymbol] = useState('');
  const [lineData, setLineData] = useState<number[]>([]);

  const checkLogin = () => {
    if(auth.loggedIn()) {
      setLoginCheck(true);
    }
  };
  
  useLayoutEffect(() => {
    checkLogin();
  }, []);

  useEffect(() => {
    if (!lineData) {
        // console.log ('No initial stock searched');
        return;
    }
    setLineData(lineData); // Pass the `user` prop as the username
    console.log('this is the new linedata', lineData)
}, [lineData]);

// Searches for stock based on symbol
  const searchStock = async (e: FormEvent) => {
    e.preventDefault();
    try {
        const data = await searchAlpacaSymbol(stockSymbol);
        if (!data) {  
            console.log('No stocks found');
            return;
        }
        const accessData: stockBar[] = data.bars[stockSymbol];
        // console.log('data is', accessData);
        let highArray: number[] = [];
        accessData.slice(1).forEach((bar: stockBar) => {
            highArray.push(bar.h);
        })
            // console.log('this is the highArray', highArray);
        setLineData(highArray)
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