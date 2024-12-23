import { useState, useLayoutEffect, ChangeEvent, FormEvent, useEffect} from 'react';
import Login from './Login.tsx'
import auth from '../utils/auth';
import { searchAlpacaSymbol } from '../api/alpacaAPI';
import Chart from '../components/Chart.tsx';
import { createStock } from '../api/stockAPI.tsx';

// Defines interface for Alapaca API results
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
  const [loginCheck, setLoginCheck] = useState(false); //For authentication
  const [stockSymbol, setStockSymbol] = useState(''); //Searched stock symbol
  const [lineData, setLineData] = useState<number[]>([]); //Returned arrays of numbers from API call
  const [chartReady, setChartReady] = useState(false); //Sets state for chart and save button to appear

  const styles = {
    btnRow: {
      display: 'flex',
      flexDirection: 'row' as React.CSSProperties['flexDirection'],
      justifyContent: chartReady ? 'space-between' : 'left',
      height: '2rem',
      marginTop: '1vw',
      marginBottom: '6vw',
      fontFamily: 'Roboto',
    },
    chartParent: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    },
    chart: {
      marginTop: '1vw',
      width: '75vw',
      height: '40vw'
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
    input: {
      marginLeft: '1vw',
    },
    form: {
      alignItems: 'left'
    },
    label: {
      marginLeft: '1vw'
    },
    saveButton: {
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
      marginRight: '2vw',
    },
  }

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
    setLineData(lineData);
    // console.log('this is the new linedata', lineData)
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
        setChartReady(true);
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
          <Login />
        </div>  
      ) : (
        //Includes form for searching stock based on symbol:
        <div>
          <div style={styles.btnRow}>
            <form style={styles.form} className='form' onSubmit={searchStock}  >
                <label style={styles.label} >Stock Symbol</label>
                <br></br>
                <input 
                    type='text'
                    name='symbol'
                    value={stockSymbol || ''}
                    onChange={handleChange}
                    required
                    style={styles.input} 
                />
                <button style={styles.button} type='submit'>Search</button>
            </form>
            {!chartReady ? (<></>
              ) : (
                //Save button appears once stock is searched and chart is populated:
                <button style={styles.saveButton}  onClick={() => createStock(stockSymbol)} type='submit'>Save</button>
              )
            }
          </div>
            {!chartReady ? (<></>
              ) : (
                //Chart import with associated styling:
                <div style={styles.chartParent}>
                <div style={styles.chart}>
                <Chart hourlyData={lineData} symbol={stockSymbol}/>
                </div>
                </div>
              )
            }
        </div>
        )
    }
    </>
  );
};

export default DashBoard;