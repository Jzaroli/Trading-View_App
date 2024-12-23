import { useState, useLayoutEffect, useEffect} from 'react';
import auth from '../utils/auth';
import { searchAlpacaSymbol } from '../api/alpacaAPI';
import Chart from '../components/Chart.tsx';
import { getAllStocks } from '../api/stockAPI.tsx';

// Used for defining data pulled from database
interface dbStock {
    id: number;
    symbol: string;
    assignedUserId: number;
    createdAt: number;
    updatedAt: number;
    assignedUser: string;
}

// Used for defining data pulled from Alpaca
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


const Favorites = () => {
  const [loginCheck, setLoginCheck] = useState(false); //For authentication
  const [retrievedStocks, setRetrievedStocks] = useState<string[]>([]) //For stocks retrieved from DB
  const [retrievedStockBars, setRetrievedStocksBars] = useState<any[]>([]) //For stocks retrieved from Alpaca

  const styles = {
    mainDiv: {
        display: 'flex',
        flexDirection: 'column' as React.CSSProperties['flexDirection'],
        justifyContent: 'center',
        alignItems: 'center',
        fontFamily: 'Roboto',
    },
    button: {
        textDecoration: 'none' as React.CSSProperties['textDecoration'],
        color: '#AFA98D',
        backgroundColor: '#182825',
        display: 'inline-flex',
        justifyContent: 'center',
        alignItems: 'center',
        fontSize: '0.9rem',
        textAlign: 'center' as React.CSSProperties['textAlign'],
        padding: '0.9vw',
        border: 'none',
        borderRadius: '8%',
        marginLeft: '1vw',
    },
    chart: {
        marginTop: '1vw',
        width: '75vw',
         height: '40vw'
    }
  }

  const checkLogin = () => {
    if(auth.loggedIn()) {
      setLoginCheck(true);
    }
  };
  
  useLayoutEffect(() => {
    checkLogin();
  }, []);

//Retrieves stocks fro DB and pushes the symbols into an array: 
  useEffect(() => {
    const fetchStocks = async () => {
        try {
            const stocks = await getAllStocks();
            let stockSymbols:string[] = [];

            stocks.forEach((object: dbStock) => {
                stockSymbols.push(object.symbol)
            });
            setRetrievedStocks(stockSymbols);
            // console.log('These are the stocks:', stocks);
        } catch (error) {
          console.error('Error fetching stocks:', error);
        }
      };
    
      fetchStocks();
    }, []);

// Loops through array of symbols and calls Alpaca for stock data, then pushed data to new array:
useEffect(() => {
    const fetchStockData = async () => {
        try {
            const barsArray: any[] = [];

            for (const stock of retrievedStocks) {
              const stockData = await searchAlpacaSymbol(stock);
              //   console.log('Stock data:', stockData);
              barsArray.push(stockData);
            }
            setRetrievedStocksBars(barsArray);
        } catch (error) {
            console.error('Error fetching stock data:', error);
        }
      };
      fetchStockData();
    }, [retrievedStocks]);

useEffect(() => {
    // console.log('these are the bars', retrievedStockBars);
}, [retrievedStockBars])


  return (
    <>
    {
      !loginCheck ? (
        <div className='login-notice'>
        </div>  
      ) : (
        <div style={styles.mainDiv}>
            {
                !retrievedStockBars ? (
                    <div>
                        <h2>No Favorites Saved</h2>
                    </div>  
                  ) : (
                    // Maps through array of objects to dynamically populate symbol and stock data into a Chart for each stock
                    <div>
                        {retrievedStockBars.map((stockBar, index) => {
                            const bars = stockBar.bars;
                            const stockName = Object.keys(bars)[0];
                            const accessData: stockBar[]  = stockBar.bars[stockName];
                            let highArray: number[] = [];
                            accessData.slice(1).forEach((bar: stockBar) => {
                                highArray.push(bar.h);
                            })
                            // console.log(accessData);
                            return(
                            <div style={styles.chart} key={index}> 
                                <Chart hourlyData={highArray} symbol={stockName}/>
                            </div> 
                            )
                        }) }
                    </div>
                  )
            }
        </div>
        )
    }
    </>
  );
};

export default Favorites;