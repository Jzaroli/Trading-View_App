import { useEffect, useState, useLayoutEffect } from 'react';
// import { Link } from 'react-router-dom';

import { getAllStocks } from '../api/stockAPI';
import ErrorPage from './ErrorPage';
// import Swimlane from '../components/Swimlane';
import { StockData } from '../interfaces/StockData.tsx';
import Login from './Login.tsx'
// import { ApiMessage } from '../interfaces/ApiMessage';

import auth from '../utils/auth';

// const boardStates = ['Todo', 'In Progress', 'Done'];

const DashBoard = () => {
  const [stocks, setStocks] = useState<StockData[]>([]);
  const [error, setError] = useState(false);
  const [loginCheck, setLoginCheck] = useState(false);

  const checkLogin = () => {
    if(auth.loggedIn()) {
      setLoginCheck(true);
    }
  };

  const fetchStocks = async () => {
    try {
      const data = await getAllStocks();
      setStocks(data);
    } catch (err) {
      console.error('Failed to retrieve stocks:', err);
      setError(true);
    }
  };

//   const deleteIndvTicket = async (ticketId: number) : Promise<ApiMessage> => {
//     try {
//       const data = await deleteTicket(ticketId);
//       fetchTickets();
//       return data;
//     } catch (err) {
//       return Promise.reject(err);
//     }
//   }

  useLayoutEffect(() => {
    checkLogin();
  }, []);

  useEffect(() => {
    if(loginCheck) {
        fetchStocks();
        console.log(stocks);
    }
  }, [loginCheck]);

  if (error) {
    return <ErrorPage />;
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
          <div className='board'>
            <button type='button' id='create-stock-link'>
              {/* <Link to='/create' >New Stock</Link> */}
            </button>
            <div className='board-display'>
            <p>This is a test</p>
              {/* {boardStates.map((status) => {
                const filteredTickets = tickets.filter(ticket => ticket.status === status);
                return (
                  <Swimlane 
                    title={status} 
                    key={status} 
                    tickets={filteredTickets} 
                    deleteTicket={deleteIndvTicket}
                  />
                );
              })} */}
            </div>
          </div>
        )
    }
    </>
  );
};

export default DashBoard;
