import { useEffect, useState, useLayoutEffect } from 'react';
// import { Link } from 'react-router-dom';
import React from 'react';

import { getAllStocks } from '../api/stockAPI';
import ErrorPage from './ErrorPage';
// import Swimlane from '../components/Swimlane';
import { StockData } from '../interfaces/StockData.tsx';
import Login from './Login.tsx'
// import { ApiMessage } from '../interfaces/ApiMessage';

import auth from '../utils/auth';
// const boardStates = ['Todo', 'In Progress', 'Done'];

import LineChart from '../components/Chart.tsx';


const DashBoard:React.FC = () => {
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
  

  // const deleteIndvStock = async (stockId: number) : Promise<ApiMessage> => {
  //   try {
  //     const data = await deleteStock(stockId);
  //     fetchStocks();
  //     return data;
  //   } catch (err) {
  //     return Promise.reject(err);
  //   }
  // }

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
              ➕
            </button>
            <div className='board-display'>
              
            <LineChart />
            
              {/* {boardStates.map((status) => {
                const filteredTickets = stocks.filter(stock => stock.status === status);
                return (
                  <Swimlane 
                    title={status} 
                    key={status} 
                    stocks={filteredTickets} 
                    // deleteStock={deleteIndvStock}
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
